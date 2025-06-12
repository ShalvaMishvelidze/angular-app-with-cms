import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed,
  effect,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, skip, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private subscriptions: Subscription[] = [];
  private productService = inject(ProductService);

  protected _imageTouched = signal(false);
  protected _imageValues = signal<{
    thumbnail: { url: string | null; id: string | null };
    images: { url: string; id: string }[];
  }>({
    thumbnail: { url: null, id: null },
    images: [],
  });

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: [''],
    discount: [
      0,
      [Validators.required, Validators.min(0), Validators.max(100)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['', [Validators.required, Validators.maxLength(50)]],
  });

  constructor() {
    this.productService.getDraft().subscribe(({ draft }) => {
      if (draft) {
        console.log(draft);

        this._imageValues.set({
          thumbnail: draft.thumbnail || { url: null, id: null },
          images: draft.images || [],
        });
        const cleanDraft = this.cleanDraftForForm(draft);
        this.form.patchValue(cleanDraft);
      }
    });

    effect(
      () => {
        const { thumbnail, images } = this._imageValues();
        if (thumbnail?.url || images?.length > 0) {
          console.log('Saving draft with images:', {
            thumbnail,
            images,
          });

          this.productService.saveAsDraft({ thumbnail, images });
          console.log('Saved draft with images:', {
            thumbnail,
            images,
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    const sub = this.form.valueChanges
      .pipe(debounceTime(1000), skip(1))
      .subscribe(() => {
        this.saveDraft();
      });

    this.subscriptions.push(sub);
  }

  cleanDraftForForm(draft: Partial<Product>): Partial<Product> {
    return {
      name: draft.name ?? '',
      description: draft.description ?? '',
      discount: draft.discount ?? 0,
      price: draft.price ?? 0,
      stock: draft.stock ?? 0,
      category: draft.category ?? '',
    };
  }

  saveDraft() {
    const draft = this.form.getRawValue();
    this.productService.saveAsDraft(draft as Product);
  }

  clearValues() {
    const oldImages = this._imageValues().images;
    const deletions = oldImages.map((image) =>
      this.productService.deleteFromCloudinary(image.id)
    );

    Promise.all([...deletions, this.productService.deleteDraft()])
      .then(() => {
        this._imageValues.set({
          thumbnail: { url: null, id: null },
          images: [],
        });
        this.form.reset({
          name: '',
          description: '',
          discount: 0,
          price: 0,
          stock: 0,
          category: '',
        });
      })
      .catch((error) => {
        console.error('Error deleting old images:', error);
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.form.invalid || this._imageValues().thumbnail.url === null) {
      this.form.markAllAsTouched();
      this._imageTouched.set(true);
      return;
    }

    this.productService.createNewProduct({
      thumbnail: this._imageValues().thumbnail,
      images: this._imageValues().images,
      ...this.form.getRawValue(),
    } as Product);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

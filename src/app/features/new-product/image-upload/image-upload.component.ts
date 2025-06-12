import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

interface Image {
  url: string | null;
  id: string | null;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  @Input() _imageValues!: WritableSignal<{ thumbnail: Image; images: Image[] }>;
  @Input() _imageTouched!: WritableSignal<boolean>;
  @Output() imageChange = new EventEmitter<{
    thumbnail: Image;
    images: Image[];
  }>();

  private productService = inject(ProductService);
  private _pending = signal<boolean>(false);

  readonly data = computed(() => {
    const value = this._imageValues?.();
    const touched = this._imageTouched?.();

    return {
      thumbnail: value?.thumbnail ?? { url: null, id: null },
      images: value?.images ?? [],
      selectedImagesNumber: value?.images?.length ?? 0,
      pending: this._pending(),
      touched,
    };
  });

  onThumbnailSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this._pending.set(true);
      this.productService.uploadToCloudinary(file).then(({ url, id }) => {
        this._imageValues.update((d) => ({
          ...d,
          thumbnail: { url, id },
          images: [{ url, id }, ...d.images],
        }));
        this._imageTouched.set(true);
        this._pending.set(false);
      });
    }
  }
  onImageSelected(event: Event) {
    if (this.data().selectedImagesNumber >= 5) {
      return;
    }
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this._pending.set(true);
      this.productService.uploadToCloudinary(file).then(({ url, id }) => {
        this._imageValues.update((d) => ({
          ...d,
          images: [...d.images, { url, id }],
        }));
        this._imageTouched.set(true);
        this._pending.set(false);
      });
    }
  }
  deleteImage(publicId: string) {
    this.productService.deleteFromCloudinary(publicId).then(() => {
      this._imageValues.update((d) => ({
        ...d,
        thumbnail:
          d.thumbnail.id === publicId ? { url: null, id: null } : d.thumbnail,
        images: d.images.filter((image) => image.id !== publicId),
      }));
    });
  }
}

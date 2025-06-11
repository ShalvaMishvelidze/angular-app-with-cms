import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Output,
  signal,
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
  private productService = inject(ProductService);
  private _data = signal<{ thumbnail: Image; images: Image[] }>({
    thumbnail: { url: null, id: null },
    images: [],
  });
  private _pending = signal<boolean>(false);

  readonly data = computed(() => ({
    thumbnail: this._data().thumbnail,
    images: this._data().images,
    selectedImagesNumber: this._data().images.length,
    pending: this._pending(),
  }));

  @Output() thumbnailChange = new EventEmitter<{
    thumbnail: Image;
    images: Image[];
  }>();

  constructor() {
    effect(() => {
      const { thumbnail, images } = this.data();
      this.thumbnailChange.emit({ thumbnail, images });
    });
  }

  onThumbnailSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this._pending.set(true);
      this.productService.uploadToCloudinary(file).then(({ url, id }) => {
        this._data.update((d) => ({
          ...d,
          thumbnail: { url, id },
          images: [{ url, id }, ...d.images],
        }));
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
        this._data.update((d) => ({
          ...d,
          images: [...d.images, { url, id }],
        }));
        this._pending.set(false);
      });
    }
  }
}

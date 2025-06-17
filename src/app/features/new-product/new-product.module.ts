import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  declarations: [NewProductComponent, ImageUploadComponent],
  imports: [CommonModule],
})
export class NewProductModule {}

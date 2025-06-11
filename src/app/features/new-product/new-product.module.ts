import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [NewProductComponent, ImageUploadComponent],
  imports: [CommonModule, SharedModule],
})
export class NewProductModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SharedModule } from '../../components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewProductComponent, ImageUploadComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class NewProductModule {}

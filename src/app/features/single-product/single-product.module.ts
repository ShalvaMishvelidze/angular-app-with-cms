import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/components/shared.module';
import { SingleProductComponent } from './single-product.component';

@NgModule({
  declarations: [SingleProductComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class SingleProductModule {}

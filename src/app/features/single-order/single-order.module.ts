import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SingleOrderComponent } from './single-order.component';

@NgModule({
  declarations: [SingleOrderComponent],
  imports: [CommonModule, RouterModule],
})
export class SingleOrderModule {}

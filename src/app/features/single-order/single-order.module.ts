import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SingleOrderComponent } from './single-order.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [SingleOrderComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class SingleOrderModule {}

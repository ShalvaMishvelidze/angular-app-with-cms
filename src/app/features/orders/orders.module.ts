import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, SharedModule],
})
export class OrdersModule {}

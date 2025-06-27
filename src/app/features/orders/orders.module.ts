import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../components/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class OrdersModule {}

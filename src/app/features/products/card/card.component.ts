import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    standalone: false
})
export class CardComponent {
  @Input() product: Product = {} as Product;
}

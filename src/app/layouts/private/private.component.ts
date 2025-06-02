import { Component } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
})
export class PrivateComponent {
  links: Link[] = [
    {
      href: 'my-products',
      title: 'My Products',
    },
    {
      href: 'my-posts',
      title: 'My Posts',
    },
    {
      href: 'orders',
      title: 'Order History',
    },
  ];
}

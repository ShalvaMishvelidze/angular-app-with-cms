import { Component, effect, inject } from '@angular/core';
import { Link } from 'src/app/models/link';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
})
export class PrivateComponent {
  private authService = inject(AuthService);
  isPending = true;

  constructor() {
    effect(() => {
      this.isPending = this.authService.isPending();
    });
  }

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

import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from 'src/app/models/link';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
})
export class PrivateComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isPending = true;
  user: User | null = null;

  constructor() {
    effect(() => {
      this.isPending = this.authService.isPending();
      this.user = this.authService.user();
    });

    if (!this.isPending && !this.user) {
      this.router.navigate(['/login']);
    }
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

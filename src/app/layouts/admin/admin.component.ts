import { Component, effect, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private authService = inject(AuthService);
  isPending = true;

  constructor() {
    effect(() => {
      this.isPending = this.authService.isPending();
    });
  }

  links = [
    {
      href: 'users',
      title: 'Users',
    },
    {
      href: 'products',
      title: 'Products',
    },
    {
      href: 'posts',
      title: 'Posts',
    },
    {
      href: 'orders',
      title: 'Orders',
    },
  ];
}

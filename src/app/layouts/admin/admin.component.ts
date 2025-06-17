import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: false
})
export class AdminComponent {
  private authService = inject(AuthService);
  router = inject(Router);
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

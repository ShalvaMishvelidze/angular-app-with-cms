import { Component, effect, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from 'src/app/models/link';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() links: Link[] = [];
  private authService = inject(AuthService);
  private router = inject(Router);
  user: User | null = null;

  constructor() {
    effect(() => {
      this.user = this.authService.user();
    });
  }

  isOnDashboard(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
  isOnAdmin(): boolean {
    return this.router.url.startsWith('/admin');
  }
  isPending(): boolean {
    return this.authService.isPending();
  }
}

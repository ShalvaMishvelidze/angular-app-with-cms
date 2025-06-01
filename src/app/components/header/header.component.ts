import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from 'src/app/models/link';
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
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  isSeller(): boolean {
    return this.authService.isSeller();
  }
  isOnDashboard(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
  isOnAdmin(): boolean {
    return this.router.url.startsWith('/admin');
  }
}

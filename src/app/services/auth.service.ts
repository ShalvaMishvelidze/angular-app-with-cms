import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api_url = environment.api_url;
  private http = inject(HttpClient);
  private router = inject(Router);
  private _user = signal<User | null>(null);

  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');
  readonly isSeller = computed(() => this._user()?.role === 'seller');

  constructor() {
    this.getUser();
  }

  getUser() {
    if (localStorage.getItem('token')) {
      this.http.get<User>(`${this.api_url}/user`).subscribe({
        next: (user) => {
          this._user.set(user);
        },
        error: () => {
          this._user.set(null);
          this.router.navigate(['/login']);
        },
      });
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{ token: string; user: User }>(
        `${this.api_url}/user/login`,
        credentials
      )
      .subscribe({
        next: ({ token, user }) => {
          localStorage.setItem('token', token);
          this._user.set(user);

          const redirectUrl = localStorage.getItem('redirectUrl');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrl');
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
  }

  register(data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.http
      .post<{ token: string; user: User }>(
        `${this.api_url}/user/register`,
        data
      )
      .subscribe({
        next: ({ token, user }) => {
          localStorage.setItem('token', token);
          this._user.set(user);

          const redirectUrl = localStorage.getItem('redirectUrl');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrl');
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Registration failed', err);
        },
      });
  }
}

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
  private _pending = signal<boolean>(false);

  readonly user = computed(() => this._user());
  readonly isPending = computed(() => this._pending());

  constructor() {
    this.getUser();
  }

  getUser() {
    if (localStorage.getItem('token')) {
      this._pending.set(true);
      this.http.get<{ user: User }>(`${this.api_url}/user/me`).subscribe({
        next: ({ user }) => {
          this._user.set(user);
          this._pending.set(false);
        },
        error: () => {
          this._user.set(null);
          this.router.navigate(['/login']);
        },
      });
    }
  }

  login(credentials: { email: string; password: string }) {
    if (this._pending()) {
      console.warn('Login already in progress');
      return;
    }
    this._pending.set(true);
    return this.http
      .post<{ token: string; user: User }>(
        `${this.api_url}/user/login`,
        credentials
      )
      .subscribe({
        next: ({ token, user }) => {
          localStorage.setItem('token', token);
          this._user.set(user);
          this._pending.set(false);

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
          this._pending.set(false);
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
    if (this._pending()) {
      console.warn('Registration already in progress');
      return;
    }

    return this.http
      .post<{ token: string; user: User }>(
        `${this.api_url}/user/register`,
        data
      )
      .subscribe({
        next: ({ token, user }) => {
          localStorage.setItem('token', token);
          this._user.set(user);
          this._pending.set(false);

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
          this._pending.set(false);
        },
      });
  }
}

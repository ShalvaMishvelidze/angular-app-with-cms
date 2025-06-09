import { computed, effect, inject, Injectable, signal } from '@angular/core';
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
  private _pending = signal<boolean>(true);
  private _askedForVerification = signal<boolean>(false);

  readonly user = computed(() => this._user());
  readonly isPending = computed(() => this._pending());
  readonly askedForVerification = computed(() => this._askedForVerification());

  constructor() {
    this.getUser();
    effect(() => {
      localStorage.setItem('user', JSON.stringify(this.user()));
    });
  }

  getUser() {
    if (localStorage.getItem('token')) {
      this._pending.set(true);
      this.http.get<{ user: User }>(`${this.api_url}/user/me`).subscribe({
        next: ({ user }) => {
          this._user.set(user);
          this._pending.set(false);
        },
        error: ({ error: { error, code } }) => {
          if (code === 'er1001') {
            console.error(error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this._user.set(null);
            this._pending.set(false);
            this.router.navigate(['/login']);
          }
          this._user.set(null);
          this._pending.set(false);
        },
      });
    } else {
      this._user.set(null);
      this._pending.set(false);
    }
  }

  updateUser(user: User) {
    this._pending.set(true);
    if (localStorage.getItem('token')) {
      this.http
        .patch<{ user: User }>(`${this.api_url}/user/me`, user)
        .subscribe({
          next: ({ user }) => {
            this._user.set(user);
            this._pending.set(false);
          },
          error: ({ error, code }) => {
            if (code === 'er1001') {
              console.error('Session expired, redirecting to login');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this._user.set(null);
              this._pending.set(false);
              this.router.navigate(['/login']);
              return;
            }
            console.error('Failed to update user', error);
            this._pending.set(false);
          },
        });
    } else {
      this._user.set(null);
      this._pending.set(false);
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

          const redirectUrl = localStorage.getItem('redirectUrlAfterLogin');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrlAfterLogin');
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

          const redirectUrl = localStorage.getItem('redirectUrlAfterLogin');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrlAfterLogin');
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

  logout() {
    localStorage.removeItem('token');
    this._user.set(null);
    this._pending.set(false);
    this.router.navigate(['/']);
  }

  askForVerification() {
    this.http
      .get<{ message: string }>(
        `${this.api_url}/user/ask-for-email-verification`
      )
      .subscribe(({ message }) => {
        console.log(message);
        this._askedForVerification.set(true);
      });
  }
}

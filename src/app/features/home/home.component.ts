import { Component, effect, inject, signal } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent {
  private cookieService = inject(CookieService);

  readonly count = signal(0);
  increment() {
    this.count.update((value) => value + 1);
  }
  decrement() {
    this.count.update((value) => value - 1);
  }
  reset() {
    this.count.set(0);
  }

  // In your Angular app (e.g., inside a service or component)
  setTestCookieDev() {
    const user = this.cookieService.getCookie('user');
    console.log(user);
  }

  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }
}

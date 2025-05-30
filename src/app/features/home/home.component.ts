import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }
}

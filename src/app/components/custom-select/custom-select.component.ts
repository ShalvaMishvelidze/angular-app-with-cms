import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.css'],
    standalone: false
})
export class CustomSelectComponent {
  @Input() name: string = '';
  @Input() handleChange: (e: Event) => void = () => {};
  @Input() options: string[] | null = null;
}

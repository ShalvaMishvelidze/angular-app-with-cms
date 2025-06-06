import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.component.html',
  styleUrls: ['./profile-input.component.css'],
})
export class ProfileInputComponent {
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() handleChange: (e: Event) => void = () => {};
  @Input() isEditing: boolean = false;

  normalStyle =
    'w-full px-[10px] py-[8px] font-semibold text-right border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-transparent';
  editingStyle =
    'w-min px-[10px] py-[8px] font-semibold text-left border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-blue-50';
}

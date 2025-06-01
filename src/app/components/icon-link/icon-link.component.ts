import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-link',
  templateUrl: './icon-link.component.html',
  styleUrls: ['./icon-link.component.css'],
})
export class IconLinkComponent {
  @Input() icon: string = '';
  @Input() href: string = '';
  @Input() title: string = '';
}

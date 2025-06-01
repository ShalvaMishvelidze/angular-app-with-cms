import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  links = [
    {
      href: '/users',
      title: 'Users',
    },
    {
      href: '/products',
      title: 'Products',
    },
    {
      href: '/posts',
      title: 'Posts',
    },
    {
      href: '/orders',
      title: 'Orders',
    },
  ];
}

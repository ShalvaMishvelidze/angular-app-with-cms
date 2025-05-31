import { Component } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent {
  links: Link[] = [
    {
      href: '/',
      title: 'Home',
    },
    {
      href: '/products',
      title: 'Products',
    },
    {
      href: '/blog',
      title: 'Blog',
    },
    {
      href: '/profile',
      title: 'Profile',
    },
  ];
}

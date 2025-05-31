import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { BlogComponent } from './features/blog/blog.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PublicComponent } from './layouts/public/public.component';
import { PrivateComponent } from './layouts/private/private.component';
import { privateGuard } from './guards/private.guard';
import { SingleProductComponent } from './features/single-product/single-product.component';
import { CartComponent } from './features/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/:id',
        component: SingleProductComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  {
    path: '',
    component: PrivateComponent,
    canActivateChild: [privateGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

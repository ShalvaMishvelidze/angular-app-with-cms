import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { BlogComponent } from './features/blog/blog.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PublicComponent } from './layouts/public/public.component';
import { PrivateComponent } from './layouts/private/private.component';
import { SingleProductComponent } from './features/single-product/single-product.component';
import { CartComponent } from './features/cart/cart.component';
import { MyProductsComponent } from './features/my-products/my-products.component';
import { MyPostsComponent } from './features/my-posts/my-posts.component';
import { NewPostComponent } from './features/new-post/new-post.component';
import { OrdersComponent } from './features/orders/orders.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AdminUsersComponent } from './features/admin-users/admin-users.component';
import { AdminProductsComponent } from './features/admin-products/admin-products.component';
import { AdminPostsComponent } from './features/admin-posts/admin-posts.component';
import { AdminOrdersComponent } from './features/admin-orders/admin-orders.component';
import { privateChildrenGuard } from './guards/private.guard';
import { adminChildrenGuard } from './guards/admin.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { smartGuard } from './guards/smart.guard';
import { publicGuard } from './guards/public.guard';
import { MySingleProductComponent } from './features/my-single-product/my-single-product.component';

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
      {
        path: 'profile',
        canActivate: [smartGuard],
        component: ProfileComponent,
      },
      {
        path: 'cart/checkout',
        canActivate: [smartGuard],
        component: CheckoutComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: PrivateComponent,
    canActivateChild: [privateChildrenGuard],
    children: [
      {
        path: '',
        redirectTo: 'my-products',
        pathMatch: 'full',
      },
      {
        path: 'my-products',
        component: MyProductsComponent,
      },
      {
        path: 'my-products/:id',
        component: MySingleProductComponent,
      },
      {
        path: 'my-posts',
        component: MyPostsComponent,
      },
      {
        path: 'new-post',
        component: NewPostComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [adminChildrenGuard],
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: 'products',
        component: AdminProductsComponent,
      },
      {
        path: 'posts',
        component: AdminPostsComponent,
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
    ],
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

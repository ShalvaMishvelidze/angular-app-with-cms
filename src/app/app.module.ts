import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './layouts/public/public.component';
import { PrivateComponent } from './layouts/private/private.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { IconLinkComponent } from './components/icon-link/icon-link.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthModule } from './features/auth/auth.module';
import { DropdownComponent } from './components/user-button/dropdown/dropdown.component';
import { ProfileModule } from './features/profile/profile.module';
import { ProductsModule } from './features/products/products.module';
import { SingleProductModule } from './features/single-product/single-product.module';
import { SharedModule } from './components/shared.module';
import { MyProductsModule } from './features/my-products/my-products.module';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent,
    AdminComponent,
    LogoComponent,
    HeaderComponent,
    IconLinkComponent,
    UserButtonComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ProfileModule,
    ProductsModule,
    SingleProductModule,
    ProfileModule,
    SharedModule,
    MyProductsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

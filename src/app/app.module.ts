import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './layouts/public/public.component';
import { PrivateComponent } from './layouts/private/private.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { MyProductsComponent } from './features/my-products/my-products.component';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthStatusBtnComponent } from './components/auth-status-btn/auth-status-btn.component';
import { IconLinkComponent } from './components/icon-link/icon-link.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent,
    AdminComponent,
    MyProductsComponent,
    LogoComponent,
    HeaderComponent,
    AuthStatusBtnComponent,
    IconLinkComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

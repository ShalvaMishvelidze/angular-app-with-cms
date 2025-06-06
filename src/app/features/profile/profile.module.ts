import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/components/shared.module';
import { ProfileInputComponent } from './profile-input/profile-input.component';

@NgModule({
  declarations: [ProfileComponent, ProfileInputComponent],
  imports: [CommonModule, SharedModule],
})
export class ProfileModule {}

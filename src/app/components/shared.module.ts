import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@NgModule({
  declarations: [SectionComponent, CustomSelectComponent],
  imports: [CommonModule],
  exports: [SectionComponent, CustomSelectComponent],
})
export class SharedModule {}

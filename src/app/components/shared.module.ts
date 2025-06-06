import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [SectionComponent, CustomSelectComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [SectionComponent, CustomSelectComponent, PaginationComponent],
})
export class SharedModule {}

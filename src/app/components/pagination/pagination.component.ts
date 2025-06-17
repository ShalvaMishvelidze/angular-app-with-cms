import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
    standalone: false
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() handlePageChange: (page: number) => void = () => {};
  @Input() currentPage: number = 1;
  @Input() isPending: boolean = false;

  btnStyle: string =
    'size-[30px] bg-blue-400 text-white text-[18px] rounded-[5px] leading-[30px] text-center hover:bg-blue-500 font-bold';
  activeBtnStyle: string =
    'size-[30px] text-white text-[18px] rounded-[5px] leading-[30px] text-center bg-blue-500 font-bold';
  textBtnStyle: string =
    'w-[60px] h-[30px] bg-blue-400 text-white text-[18px] rounded-[5px] leading-[30px] text-center mx-[15px] uppercase hover:bg-blue-500 font-bold';

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1).slice(
      this.currentPage - 1,
      this.currentPage + 4
    );
  }
}

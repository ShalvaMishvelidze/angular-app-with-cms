import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private _filters = signal({
    search: '',
    category: 'all',
    sort: '',
    order: '',
    page: 1,
  });
  readonly filters = computed(() => this._filters());

  sortOptions = [
    {
      label: 'Price: Low to High',
      value: 'price asc',
    },
    {
      label: 'Price: High to Low',
      value: 'price desc',
    },
    {
      label: 'Title: A-Z',
      value: 'name asc',
    },
    {
      label: 'Title: Z-A',
      value: 'name desc',
    },
  ];
  products: Product[] | null = null;
  categories: string[] | null = null;
  totalPages: number = 0;
  isPending = true;

  searchControl = new FormControl();

  handleChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === 'sort') {
      const [sort, order] = value.split(' ');
      this._filters.update((current) => ({
        ...current,
        sort: sort || '',
        order: order || '',
      }));
      return;
    }

    this._filters.update((current) => ({
      ...current,
      [name]: value,
    }));
  };

  constructor() {
    this.productService.getProducts();
    effect(() => {
      this.products = this.productService.products();
      this.categories = this.productService.categories();
      this.totalPages = this.productService.totalPages();
      this.isPending = this.productService.isPending();
    });
    effect(
      () => {
        const { search, category, sort, order, page } = this.filters();
        this.productService.getProducts(search, category, sort, order, page);
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        this._filters.update((current) => ({
          ...current,
          search: query,
        }));
      });
  }
}

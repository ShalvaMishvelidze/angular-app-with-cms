import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySingleProductComponent } from './my-single-product.component';

describe('MySingleProductComponent', () => {
  let component: MySingleProductComponent;
  let fixture: ComponentFixture<MySingleProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySingleProductComponent]
    });
    fixture = TestBed.createComponent(MySingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

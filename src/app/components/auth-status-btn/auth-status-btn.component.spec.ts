import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthStatusBtnComponent } from './auth-status-btn.component';

describe('AuthStatusBtnComponent', () => {
  let component: AuthStatusBtnComponent;
  let fixture: ComponentFixture<AuthStatusBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthStatusBtnComponent]
    });
    fixture = TestBed.createComponent(AuthStatusBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

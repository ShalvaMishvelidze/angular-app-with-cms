import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isAuthenticated(): boolean {
    return false;
  }
  isAdmin(): boolean {
    return false;
  }
  isSeller(): boolean {
    return false;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  setCookie(
    name: string,
    value: string,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  ): void {
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    const expires = new Date(Date.now() + totalSeconds * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; Domain=.myapp.local; Path=/; Expires=${expires}`;
    console.log(`Cookie set: ${name}=${value}`);
  }

  getCookie(name: string): string | null {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  }

  deleteCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.myapp.local`;
    console.log(`Cookie deleted: ${name}`);
  }
}

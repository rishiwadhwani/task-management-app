import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { decodeJWT } from '../../helper/jwt.helper';
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userEmail: string | null = null;
  private userType: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const tokenData = decodeJWT(token);
      if (!moment().isBefore(moment(tokenData.exp * 1000))) {
        this.logout();
      } else {
        this.userEmail = tokenData.userEmail;
        this.userType = tokenData.userType;
      }
    }
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<{ success: boolean, token?: string }>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        if (response.success && response.token) {
          localStorage.setItem('jwt_token', response.token);
          const tokenData = decodeJWT(response.token);
          this.userEmail = tokenData.email || null;
          this.userType = tokenData.userType || null;
          return true;
        } else {
          localStorage.removeItem('jwt_token');
          this.userEmail = null;
          this.userType = null;
          return false;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.userEmail = null;
    this.userType = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const tokenData = decodeJWT(token);
      return moment().isBefore(moment(tokenData.exp * 1000));
    }
    return false;
  }

  getUserEmail(): string {
    return this.userEmail || '';
  }

  getUserType(): string {
    return this.userType || '';
  }
}

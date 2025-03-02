import {inject, Injectable, signal} from '@angular/core';
import {UserDTO} from '../models/UserDTO/user-dto';
import {JwtDecodeService} from './jwt-decode.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {


  private sessionKey = 'user_session';
  private authenticated = signal<boolean>(false);
  private jwtDecodeService = inject(JwtDecodeService);

  /**
   * Stores the session data in the local storage.
   *
   * @param sessionData - The session data to be stored. It can be of any type.
   * @returns void
   */
  setSession(sessionData: UserDTO): void {
    try {
      const user = sessionData.result;

      localStorage.setItem(this.sessionKey, JSON.stringify(user));
      this.authenticated.set(true);
    } catch (error) {
      console.error('Failted to save session data:', error);
    }
  }

  /**
   * Sets the authentication token in local storage
   *
   * @param token - The authentication token to be set. It will be prefixed with 'Bearer ' before storing.
   */
  setToken(token: string): void {
    token = `Bearer ${token}`;
    localStorage.setItem('token', token);
  }

  /**
   * Retrieves the expiration time of the current session token.
   *
   * @returns {number | string} The expiration time of the token as a JSON string, or 0 if no token is found.
   */
  getExpiration() {
    const token = this.getToken();
    if (!token) {
      return 0;
    }
    const decodedToken = this.jwtDecodeService.decodeToken(token);
    return JSON.stringify(decodedToken.exp);
  }

  /**
   * Retrieves the role from the JWT token.
   *
   * @returns {string} The role extracted from the token. Returns an empty string if the token is not available.
   */
  getRole() {
    const token = this.getToken();
    if (!token) {
      return '';
    }
    const decodedToken = this.jwtDecodeService.decodeToken(token);
    const roles =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
    return roles;
  }

  /**
   * Retrieves the authentication token from the local storage.
   *
   * @returns {string | null} The token if it exists in local storage, otherwise null.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Retrieves the session data from local storage.
   *
   * @returns {any | null} The parsed session data if it exists, otherwise null.
   */
  getSession(): any | null {
    const session = localStorage.getItem(this.sessionKey);
    if (session) {
      this.authenticated.set(true);
    }
    return session ? JSON.parse(session) : null;
  }

  /**
   * Ends the current user session by removing session-related data from local storage.
   * Specifically, it removes the session key, token, and user information.
   * Additionally, it sets the authenticated state to false.
   */
  endSession(): void {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authenticated.set(false);
  }

  /**
   * Checks if the user is authenticated.
   *
   * @returns {boolean} True if the user is authenticated, otherwise false.
   */
  isAuthenticated() {
    return this.authenticated();
  }
}

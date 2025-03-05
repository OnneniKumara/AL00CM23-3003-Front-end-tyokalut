import {Injectable} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtDecodeService {
  decodeToken(token: string): any {
    return jwtDecode<JwtPayload>(token);
  }
}

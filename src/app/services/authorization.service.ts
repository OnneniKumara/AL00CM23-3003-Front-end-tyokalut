import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SessionManagementService} from './session-management.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  // palveluiden injektointi
  sessionService = inject(SessionManagementService);

  /**
   * Sieppaa HTTP-pyynnöt ja lisää niihin Authorization-otsikon istunnon tokenilla.
   *
   * Tämä metodi toimii välikätenä kaikkien HTTP-pyyntöjen käsittelyssä sovelluksessa,
   * lisäten tokenin jokaiseen pyyntöön autentikoinnin varmistamiseksi.
   *
   * @param req - Lähtevä HTTP-pyyntö, joka halutaan siepata
   * @param next - Seuraava käsittelijä ketjussa, jolle muokattu pyyntö välitetään
   * @returns Observable<HttpEvent<any>> - Palauttaa tarkkailuolion HTTP-tapahtumasta
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sessionService.getToken();
    const requestWithAuth = req.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
    return next.handle(requestWithAuth);
  }
}

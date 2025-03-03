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

    // Jos pyyntö on finnkino-news, ei lisätä tokenia,
    // koska se on julkisesti saatavilla ja ei vaadi autentikointia
    // finnkino-news ei toimi, jos token lisätään pyyntöön
    if (req.url.includes('https://www.finnkino.fi/xml/News/')) {
      return next.handle(req);
    }

    // Haetaan token ja lisätään se pyyntöön
    const token = this.sessionService.getToken();
    const requestWithAuth = req.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
    return next.handle(requestWithAuth);
  }
}

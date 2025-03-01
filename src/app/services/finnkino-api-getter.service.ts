import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {parseString} from 'xml2js';
import {PopUpService} from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class FinnkinoApiGetterService {

  /*
  Tehtävänannossa annettu osoite
   */
  url: string = "https://www.finnkino.fi/xml/News/";
  protected popUpService = inject(PopUpService);

  constructor(private httpClient: HttpClient) {
  }

  /*
  funktio jolla haetaan getillä dataa finnkinolta
   */
  getData(): Observable<any> {

    return this.httpClient.get(this.url, {responseType: "text"})
      .pipe(map(response => {

          let finnKinoData: any;

          parseString(response, {trim: true, explicitArray: false, mergeAttrs: true},
            function (error: any, result: any) {
              finnKinoData = result.News.NewsArticle;
            });

          return finnKinoData;
        }),
        catchError(error => {

          // jos tulee virhe, tulostetaan se konsoliin ja palautetaan virhe
          console.error('Error fetching data:', error);

          // avataan popup jossa kerrotaan että tuli virhe
          this.popUpService.openDialog('Tapahtui virhe: ' + error);
          return throwError(error);
        })
      );
  }
}

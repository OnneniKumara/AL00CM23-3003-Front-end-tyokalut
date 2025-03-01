import {ChangeDetectionStrategy, Component, inject,} from '@angular/core';
import {FinnkinoApiGetterService} from '../../../services/finnkino-api-getter.service';
import {PopUpService} from '../../../services/pop-up.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {AsyncPipe, DatePipe, NgClass, NgForOf,} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {FinnKinoFilterPipe} from '../../../pipes/finn-kino-filter.pipe';

@Component({
  selector: 'app-finnkino-news',
  imports: [
    MatExpansionModule,
    AsyncPipe,
    NgForOf,
    DatePipe,
    NgClass,
    MatFormField,
    MatInput,
    FormsModule,
    FinnKinoFilterPipe,
  ],
  templateUrl: './finnkino-news.component.html',
  styleUrl: './finnkino-news.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinnkinoNewsComponent {

  protected searchString: string = "";

  panelOpenState: boolean[] = [];
  // otetaan käyttöön FinnkinoApiGetterService
  private finnKinoApiGetterService = inject(FinnkinoApiGetterService);

  // panelin tila
  // readonly panelOpenState = signal(false);
  protected finnKinoData$ = this.finnKinoApiGetterService.getData();
  // PopUpService käyttöön

  private popUpService = inject(PopUpService);

  // Initialize the panelOpenState array based on the number of items

  ngOnInit() {
    this.finnKinoData$.subscribe(data => {
      this.panelOpenState = new Array(data.length).fill(false);
    });
  }

  setPanelOpenState(index: number, state: boolean) {
    this.panelOpenState[index] = state;
  }

}

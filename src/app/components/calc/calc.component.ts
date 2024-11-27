import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatButtonModule, MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-calc',
  standalone: true,
  imports:  [MatGridListModule, MatButtonModule,
            MatButton, NgForOf, MatGridTile,
            MatCardModule
            ],
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcComponent {

  title:string ='Calculator/laskin'

  // nappi-array
  buttons: string[] =
      [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '=', '0', 'Del','+',
        '^', '.', '(', ')',
        'Clr', 'MemSto', 'MemRcl', 'MemClr'
      ];

  // stringi laskutoimitukselle
  calculation:string = ''

  // laskimen muististringi
  memSto:string = ''
  // muuttuja edelliselle tulokselle
  previous = '';

  // lopputulema
  result:string = '';

  // ilmoitukset
  notices:string = ''

  addValue(value:string)
      {
        this.notices = ''
        // asetetaan edelliseen tämänhetkinen tulos
        this.previous = this.result

        // ehto laskutoimituksen lopputuleman saamiseksi -> '='-merkki
        if (value == '=')
        {
            // tsekataan ettei ole tyhjä laskustringi
            if (this.calculation == '')
            {
              // herja
              this.notices = 'ei voi laskea, ei laskettavaa -> tyhjä calculation string!'
              console.log(this.notices)

              return;
            }

            // tsekataan että laskustringissä ei ole yritetty nollalla jakoa
            if (this.calculation.includes("/0"))
            {
              // herja
              this.notices = 'ei voi laskea, koitat jakaa nollalla!'
              console.log(this.notices)

              // tyhjätään
              this.calculation =''

              return;
            }

            // tupla-operaattoriherja '**' ei mukana koska se on eval() potenssi
          if (this.calculation.includes("++")
            || this.calculation.includes("--")
            || this.calculation.includes("//")
            || this.calculation.includes("^^"))
          {
            // herja
            this.notices = 'tupla operaattori, koita käyttää sulkuja.'
            console.log(this.notices)

            // tyhjätään
            this.calculation =''
            return;
          }

            // yritetääs tätä
            try
            {
              // lasketaan
              this.result = eval?.(this.calculation)

              // tulostukset konsoliin
              console.log('lopputulema: ' + this.result
                          + '\nedellinen tulos/previous muuttujan arvo: ' + this.previous)

              // asetetaan edelliseen tulokseen nykyinen tulos
              this.previous = this.result

              // tyhjätään laskustringi
              // this.calculation = ''

              return;
            }

            // napataas kiinni loput virheet.)
            catch
            {
              // herjat
              this.notices = '--Error - määrittelemätön virhe - tarkista lasku--'
              console.log(this.notices)

              // tyhjäys
              this.calculation = ''
              return;
            }
        }
        // laskutoimitusstringin tyhjäys jos painallus on 'Clr'
        if (value == 'Clr')
        {
          this.calculation ='' // tyhjätään

          // ilmoitukset
          this.notices = 'laskutoimitusstringi tyhjätty'
          console.log(this.notices)

          return;
        }

        // pyyhkiminen/del/backspace
        if (value == 'Del')
        {
          this.calculation = this.calculation.slice(0, this.calculation.length - 1)
          console.log('Del- poista yksi merkki - laskutoimitus nyt: ' + this.calculation)
          return;
        }

        // MemStore nappi eli muistiin tallennus
        if (value == 'MemSto')
        {
          if (this.previous == '' && this.calculation != '')
          {
            this.memSto = this.calculation
          }

          if (this.previous != '' && this.calculation =='')
          {
            this.memSto =this.previous
          }

          else
          {
            this.memSto = this.calculation
          }

          console.log('muistiin lisätty: ' + this.memSto)

          return
        }

        // MemRcl nappi eli muistista haku
        if (value == 'MemRcl')
        {
          this.calculation += this.memSto
          console.log('muistin sisältö (' + this.memSto + ') laskutoimitukseen, laskutoimitus nyt: ' + this.calculation)

          return
        }

        // MemClr nappi eli muistin tyhjentäminen
        if (value == 'MemClr')
        {
          this.memSto = ''

          // ilmoitukset
          this.notices = 'muisti tyhjätty'
          console.log(this.notices)

          return
        }

        // laskutoimitusstringin lisäystä

        // jos potenssimerkki
        if (value == '^')
        {
          // vastaan se muuttamaan eval()  funktion potenssia
          this.calculation += '**'
        }
        // muutoin tavallinen lisäys
        else
        {
          this.calculation += value;
        }
        // tulostelua konsoliin devatessa
        console.log('lisätty laskustringiin arvo: ' + value);
        console.log('laskustringi/toimitus nyt: ' + this.calculation)
      }
}

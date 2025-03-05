import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'finnKinoFilter'
})

/*
Oma pipe, joka suodattaa Finnkinon uutiset hakusanalla
 */

export class FinnKinoFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => {

      // console.log(it)

      return it.Title.toLocaleLowerCase().includes(searchText);
    });
  }
}

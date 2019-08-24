import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform {
  public transform(temp: number, unitType: string) {
    if (unitType === 'celsius') {
      const celsius = (temp - 32) * 0.5556;
      return celsius;
    } else {
      return temp;
    }
  }
}

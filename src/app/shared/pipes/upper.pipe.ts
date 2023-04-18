import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper',
})
export class UpperPipe implements PipeTransform {
  transform(value: string): string {
    if(!value) return ''
    return value[0].toUpperCase() + value.slice((value.length - 1) * -1);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'add05'
})
export class Add05Pipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if(value < 10) {
            return '0' + value;
        }
        return value;
    }

}

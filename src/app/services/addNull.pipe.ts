import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addO'
})
export class AddOPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if(value < 10) {
            return '0' + value;
        }
        return value;
    }

}

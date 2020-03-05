import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'add02'
})
export class Add02Pipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if(value < 10) {
            return '0' + value;
        }
        return value;
    }

}

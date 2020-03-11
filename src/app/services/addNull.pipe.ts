import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addNull'
})
export class AddNullPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if(value < 10) {
            return '0' + value;
        }
        return value;
    }

}

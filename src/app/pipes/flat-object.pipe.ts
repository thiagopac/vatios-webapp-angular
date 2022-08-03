import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatObjectPipe',
})
@Injectable({
  providedIn: 'root',
})
export class FlatObjectPipe implements PipeTransform {
  transform(obj: any): any {
    const flattened:any = {}
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, this.transform(value))
      } else {
        flattened[key] = value
      }
    })
    return flattened
  }
  // transform(obj: any): any {
  //   let res:any = {};
  //   for (const [key, value] of Object.entries(obj)) {
  //       if (typeof value === 'object') {
  //           res = { ...res, ...this.transform(value) };
  //       } else {
  //           res[key] = value;
  //       }
  //   }
  //   return res;
  // }

  // transform(obj: any): any {
  //   return Object.assign(
  //     {},
  //     ...(function _flatten(o): any {
  //       return [].concat(
  //         ...Object.keys(o).map((k) =>
  //           typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] }
  //         )
  //       );
  //     })(obj)
  //   );
  // }
}

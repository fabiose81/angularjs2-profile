import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
    selector: '[isEmpty][formControlName],[isEmpty][formControl],[isEmpty][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmptyValidator), multi: true }
    ]
})
export class EmptyValidator implements Validator {

      validate(c: FormControl): { [key: string]: any } {

      var stringValueLength =  String(c.value).trim();

          if (stringValueLength.length == 0)
              return {
                isEmpty: false
              }

          return null;
      }

}
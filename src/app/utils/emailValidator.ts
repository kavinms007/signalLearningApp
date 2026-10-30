import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator(value:AbstractControl): ValidationErrors | null{

    console.log('value',value)

    return value.value.length > 5 ?  { greateThan : true } : null;

}
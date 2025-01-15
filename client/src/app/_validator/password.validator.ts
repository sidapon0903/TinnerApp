import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { interval } from "rxjs";


export const PasswordValidator = function (minLength:number,maxLength:number):ValidatorFn {
    return function (control : AbstractControl):ValidationErrors | null{
        const passwonrd = control.value as string
        if(!passwonrd )return {required:true}
        else if (passwonrd.length<minLength)
            return{invaLidMinLength : true}
        else if (passwonrd.length<maxLength)
            return{invaLidMaxLength : true}
      else if (!/[a-z]/.test(passwonrd))
        return{invaLidLowerCase:true}
      else if (!/[A-Z]/.test(passwonrd))
        return{invaLidUpperCase:true}
      else if (!/[0-9]/.test(passwonrd))
        return{invaLidNumeric:true}
      else if (!/[!@#$%&*(),.?":{}|<>]/.test(passwonrd))
        return{invaLidSpecialChar:true}
    
        return null

    }
    
}

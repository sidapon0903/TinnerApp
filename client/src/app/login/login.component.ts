import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormRecord, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from '../_validator/password.validator';
import { PasswordMatchValidator } from '../_validator/password.match.validator';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
 
})
export class LoginComponent {
  mode : 'login' | 'register'= 'login'
  form:FormGroup

  errorMessages = {
    username :signal(''),
    password :signal(''),
     dispaly_name:signal(''),
    confirm_password:signal(''),
    
  }

  constructor(){
    this.form = new FormGroup ({
      username : new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
      Password : new FormControl(null,[Validators.required,PasswordValidator(8,16)]),
    })
  }
toggleMode(){
  this.mode = this.mode === 'login'? 'register':'login'
  this.updaForm  ()
}
  updaForm() {
   if (this.mode === 'register'){
this.form.addControl('confirmpassword',new FormControl(null,Validators.required))
this.form.addValidators(PasswordMatchValidator('password','confim_password'))

this.form.addControl('display_name',new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]))
this.form.addControl('date_of_birth',new FormControl(null,Validators.required))
this.form.addControl('gander',new FormControl(null,Validators.required))
this.form.addControl('looking_for',new FormControl(null,Validators.required))
   }else{
    this.form.removeControl('confirmpasseord')
    this.form.removeValidators(PasswordMatchValidator ('password','confim_password'))
    this.form.removeControl('diaplay_name')
    this.form.removeControl('date_of_birth')
    this.form.removeControl('ganter')
    this.form.removeControl('looking_for')

   }
}
onSudmit(){

}
updateErrorMassage(ctrlName:string){
  const control = this.form.controls[ctrlName]
  if(!control)return
  switch(ctrlName){
    case'username':
    if(control.hasError('required'))
    this.errorMessages.username.set('required')
  else if (control.hasError('minlength'))
    this.errorMessages.username.set('mist be least 6 characters')
  else if (control.hasError('maxlength'))
    this.errorMessages.username.set('mist be least 16 characters')
  else
  this.errorMessages.username.set('')
    break
    case'password':
    if (control.hasError('required'))
      this.errorMessages.username.set('required')
    else if (control.hasError('invaLidMinLength'))
      this.errorMessages.username.set('must br at last 8 characters long')
    else if (control.hasError('invaLidMaxLength'))
      this.errorMessages.username.set('must br at last 16 characters long') 
    else if (control.hasError('invaLidLowerCase'))
        this.errorMessages.username.set('must contain minimum of 1 lower case letter')
    else if (control.hasError('invaLidUpperCase'))
      this.errorMessages.username.set('must contain minimum of 1 lower case letter')
    else if (control.hasError('invaLidNumeric'))
      this.errorMessages.username.set('must contain minimum of 1 numeric character')
    else if (control.hasError('invaLidSpercialChar'))
      this.errorMessages.username.set('must contain minimum of 1 special character')
    break
    this.errorMessages.username.set('')
    break

    case'display_name':
   break

    case 'confirm_password':
        if (control.hasError('required'))
          this.errorMessages.confirm_password.set('required')
        else if (control.hasError('misMatch'))
          this.errorMessages.confirm_password.set('do not match password')
        else
          this.errorMessages.confirm_password.set('')
        break
  }


  }
}


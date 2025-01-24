import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-profile',
  imports: [MatTabsModule,FormsModule,MatInputModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
private  accoutService = inject(AccountService)
user:User
@ViewChild('form')form?:NgForm
constructor(){
  this.user=this.accoutService.data()!.user
}
OnSubmit(){
this.accoutService.updateProfile(this.form?.value())
}
}

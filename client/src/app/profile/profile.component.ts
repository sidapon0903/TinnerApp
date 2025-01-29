import { Component, inject, ViewChild, viewChild } from '@angular/core'
import { User } from '../_models/user'
import { AccountService } from '../_services/account.service'
import { MatTabsModule } from '@angular/material/tabs'
import { FormsModule, NgForm } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { PhotoComponent } from "./photo/photo.component"


@Component({
  selector: 'app-profile',
  imports: [MatTabsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, PhotoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  onSubmit() {
    throw new Error('Method not implemented.')
  }
  updateErrorMessgae(arg0: string) {
    throw new Error('Method not implemented.')
  }
  toggleMode() {
    throw new Error('Method not implemented.')
  }
  private accoutService = inject(AccountService)
  user: User
  @ViewChild('form') form?: NgForm
  mode: any
  errorMessages: any
  mindate: any
  maxdate: any
  startDate: any
  errorFormServer: any
  constructor() {
    this.user = this.accoutService.data()!.user
  }
  OnSubmit() {
    this.accoutService.updateProfile(this.form?.value())
  }
}

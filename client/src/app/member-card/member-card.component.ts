import { Component, input } from '@angular/core'
import { User } from '../_models/user'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-member-card',
  imports: [MatButtonModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  member = input.required<User>()
}

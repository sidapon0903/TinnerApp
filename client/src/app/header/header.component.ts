import { Component, inject, signal,computed } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterLink, RouterLinkWithHref } from "@angular/router";
import { User } from "../_models/user";
import { AccountService } from "../_services/account.service";
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: "app-header",
  imports: [MatMenuModule,MatToolbarModule, MatButtonModule, MatIconModule,RouterLinkWithHref,RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private accountSevice = inject(AccountService)
  private router = inject(Router)
  user = computed (()=> this.accountSevice.data()?.user)
  logOut(){
 this.accountSevice.logout()
 this.router.navigate(['/'])  }
}
    

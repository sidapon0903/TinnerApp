import { Component, inject, OnInit } from '@angular/core'
import { User } from '../../_models/user'
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery'
import { MemberService } from '../../_services/member.service'
import { Photo } from '../../_models/photo'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
@Component({
  selector: 'app-member-profile',
  imports: [GalleryModule, MatSidenavModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.scss'
})
export class MemberProfileComponent implements OnInit {
  toggle() {
    throw new Error('Method not implemented.')
  }
  member!: User
  images: GalleryItem[] = []
  memberService = inject(MemberService)
  activeRoute = inject(ActivatedRoute)
  router = inject(Router)
  private initGalleryItem(Photos: Photo[]) {
    for (const photo of Photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }
  async getMember() {
    const username = this.activeRoute.snapshot.paramMap.get('username')
    if (!username) return
    const member = await this.memberService.getMemberByUsername(username)
    if (!member) {
      this.router.navigate(['404'])
    } else {
      if (member.photos) {
        this.initGalleryItem(member.photos)
      }
    }
  }
  ngOnInit(): void {
    this.getMember()
  }
}
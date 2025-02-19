import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { LikeService } from '../_services/like.service'
import { default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'

import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatFormField, MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { default_pagesizeOption } from '../_models/pagination'
import { MemberCardComponent } from '../memder/member-card/member-card.component'

@Component({
  selector: 'app-following',
  imports: [MemberCardComponent, MatIconModule, MatButtonModule, MatPaginatorModule,
    MatExpansionModule, FormsModule, MatInputModule, MatFormField, MatSelectModule],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent implements OnInit {
  private likeService = inject(LikeService)
  following: WritableSignal<Paginator<UserQueryPagination, User>>
  // paginator: any;
  pageSize: number[] = default_pagesizeOption

  constructor() {
    this.following = this.likeService.following
  }

  async onSearch() {
    this.likeService.getfollowing()
  }
  ngOnInit(): void {
    this.onSearch()
  }

  onResetSearch() {
    this.following.set(default_paginator)
    this.onSearch()
  }
  onPageChange(event: PageEvent) {
    const copyPaginator = this.following()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageSize
    this.following.set(copyPaginator)

    this.onSearch()
  }
}
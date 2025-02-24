import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { LikeService } from '../_services/like.service'
import { default_pagesizeOption, default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MemberCardComponent } from '../memder/member-card/member-card.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatFormField, MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion'

@Component({
  selector: 'app-followers',
  imports: [MemberCardComponent, MatIconModule, MatButtonModule, MatPaginatorModule,
    MatExpansionModule, FormsModule, MatInputModule, MatFormField, MatSelectModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss'
})

export class FollowersComponent implements OnInit {
  onReset() {
    throw new Error('Method not implemented.')
  }
  private likeService = inject(LikeService)
  followers: WritableSignal<Paginator<UserQueryPagination, User>>
  // paginator: any;
  pageSize: number[] = default_pagesizeOption

  constructor() {
    this.followers = this.likeService.following
  }

  async onSearch() {
    this.likeService.getfollowers()
  }
  ngOnInit(): void {
    this.onSearch()
  }

  onResetSearch() {
    this.followers.set(default_paginator)
    this.onSearch()
  }
  onPageChange(event: PageEvent) {
    const copyPaginator = this.followers()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageSize
    this.followers.set(copyPaginator)

    this.onSearch()
  }
}


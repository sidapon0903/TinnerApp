import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'
import { default_pagesizeOption, default_paginator, Paginator, UserQueryPagination } from '../_helper/pagination'
import { User } from '../_models/user'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
@Component({
  selector: 'app-memder',
  imports: [MatButtonModule, MatPaginatorModule, MatInputModule, MatFormFieldModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  private memberService = inject(MemberService)
  paginator: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pagesizeOption
  constructor() {
    this.paginator = this.memberService.paginator
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.')
  }
  onpageChange(event: PageEvent) {
    const copyPaginator = this.paginator()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageSize
    this.paginator.set(copyPaginator)
    this.onSearch()
  }
  onSearch() {
    this.memberService.getMembers()
  }
  onResetSearch() {
    this.paginator.set(default_paginator)
    this.onSearch()
  }
}

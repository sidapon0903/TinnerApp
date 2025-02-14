import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'
import { User } from '../_models/user'
import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MemberCardComponent } from './member-card/member-card.component'
import { default_paginator, Paginator, UserQueryPagination, default_pagesizeOption } from '../_helper/pagination'

@Component({
  selector: 'app-member',
  imports: [MemberCardComponent, MatIconModule, MatButtonModule, MatSelectModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule],
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
    this.memberService.getMembers()
  }

  onPageChange(event: PageEvent) {
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


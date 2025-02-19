import { inject, Injectable, signal } from "@angular/core"
import { environment } from "../../environments/environment"
import { default_pagesizeOption, default_paginator, Paginator, QueryPagination } from "../_models/pagination"
import { Message } from "../_models/message"
import { Subject } from "rxjs"
import { WebSocketSubject } from 'rxjs/webSocket'
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: 'root'
})
export class MessageSevices {
    private http = inject(HttpClient)
    private baseUrl = environment.baseUrl + 'api/message'
    private wsUrl = environment.wsUrl
    paginator = signal<Paginator<QueryPagination, Message>>(default_paginator)
    isWsConnected = signal<boolean>(false)
    private socket$!: WebSocketSubject<any>
    private messageSubject = new Subject<Message>()
    message$ = this.messageSubject.asObservable()
    constructor() {
        const protocol = window.location.protocol === 'https:' ? 'ws'
            this.wsUrl = environment.production
            ? `${window.location.host}${environment.wsUrl}`
            : environment.wsUrl
    }
    connect(recipinent_id: string, token: string, user_id: string): void { }
    sendMessage(message) { }
    close() { }
    getMessage() { }
}
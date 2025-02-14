import { Location } from '@angular/common'
import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { delay, finalize } from 'rxjs'
import { LoadingService } from '../_services/loading.service'

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
  if (req.url.includes('/api/Like')) return next(req)

  loadingService.loading()
  return next(req).pipe(
    //delay(3000),
    finalize(() => {
      loadingService.idle()
    })
  )
}

import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
loadingRequestCount = 0

private spinner = inject(NgxSpinnerService)
loading(){
this.loadingRequestCount++
this.spinner.show(undefined,{
  type : "line-spin-clockwise-fade-rotating",
  bdColor :'rgba(0, 0, 0, 0.8)',
  color :'hsla(0, 16.80%, 19.80%, 0.00)',
  fullScreen : true
})
}
idle(){
  this.loadingRequestCount--
  if(this.loadingRequestCount <= 0){
    this.loadingRequestCount = 0
    this.spinner.hide()
  }
}
}

import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  

private router = inject(Router) 
private SnackBar = inject(MatSnackBar)
private SnackBarConfig :( MatSnackBarConfig) = {
  horizontalPosition : 'right',
  verticalPosition:'top'
}
constructor() { }

    handError(err:any){
      if(err){
switch (err.status){
case 400:
  this.SnackBar.open('','ok',this.SnackBarConfig)
    break
  case 404 :
    this.SnackBar.open('/404')
    break
    case 500:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
    case 506:
    case 507:
    case 508:
    case 509:
    case 510:
    case 511:
if (err.error.message === 'Token has expired'){
this.router.navigate(['/'])
}
const navExtras:NavigationExtras = { 
  state:{
    error:err.error,
    massege:err.state}
}
this.router.navigate(['/sever-error'],navExtras)
break
      
default:
    this.SnackBar.open('something went wrong please try agin later.','ok',this.SnackBarConfig)
    break
}
      }
    
      return throwError(()=>err)
    }  
    
  }   
  



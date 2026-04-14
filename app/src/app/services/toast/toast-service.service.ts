import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject();
  toast$ = this.toastSubject.asObservable();

  showMessage(msg: string){
    this.toastSubject.next(msg);
  }


}

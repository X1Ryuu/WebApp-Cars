import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../services/toast/toast-service.service";

@Component({
  selector: 'app-toast',
  imports: [],
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit{
  visible = false;
  message: unknown = '';
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe(msg =>{

      this.visible = true;
      this.message = msg;
      setTimeout(() => this.visible = false, 3000);
    });
  }


}

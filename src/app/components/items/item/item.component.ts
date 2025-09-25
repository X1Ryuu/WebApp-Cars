import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent /*implements OnInit*/{
  @Input() date!: string;
  @Input() name!: string;
  @Input() type!: string;
  @Input() url!: string;

  isFavorite = false;
  constructor(private route: ActivatedRoute) {
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  showToast() {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      const toast = new (window as any).bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}

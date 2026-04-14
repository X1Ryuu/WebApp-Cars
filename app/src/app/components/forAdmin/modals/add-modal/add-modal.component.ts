  import {Component, EventEmitter, HostListener, Output} from '@angular/core';
  import {NgIf} from '@angular/common';
  import {CarAddPillsComponent} from '../../editionPills/car-add-pills/car-add-pills.component';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [
    CarAddPillsComponent
  ],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})
export class AddModalComponent {
  isOpen = false; // Kontroluje widoczność

  @Output() closed = new EventEmitter<void>();

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.closed.emit(); // Powiadamia rodzica o zamknięciu
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.closeModal();
  }
}

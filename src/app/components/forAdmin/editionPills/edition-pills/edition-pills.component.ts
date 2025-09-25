import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BrandEditionComponent} from '../brand-edition/brand-edition.component';
import {ModelEditionComponent} from '../model-edition/model-edition.component';

import {Subscription} from 'rxjs';
import {BreadcrumbService} from '../../../../services/breadcrumbs/breadcrumb.service';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-edition-pills',
  standalone: true,
  imports: [


    BrandEditionComponent,
    ModelEditionComponent,
    NgClass
  ],
  templateUrl: './edition-pills.component.html',
  styleUrl: './edition-pills.component.css'
})
export class EditionPillsComponent implements OnInit, OnDestroy {
  activeTab: string = 'brands';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  breadcrumbs: Array<{ label: string, url: string }> = [];
  private breadcrumbSubscription: Subscription | null = null;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
/*    this.breadcrumbSubscription = this.breadcrumbService.breadcrumbs$.subscribe(
      (breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      }
    );*/
  }

  ngOnDestroy(): void {
/*    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }*/
  }

/*  @ViewChild('modalRef') modal!: AddModalComponent;
  openModal() {
    this.modal.openModal();
  }*/
}

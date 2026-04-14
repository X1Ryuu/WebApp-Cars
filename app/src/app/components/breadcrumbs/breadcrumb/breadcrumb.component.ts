import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {BreadcrumbService} from '../../../services/breadcrumbs/breadcrumb.service';
import {Subscription} from 'rxjs';
import {AddModalComponent} from "../../forAdmin/modals/add-modal/add-modal.component";
import {AuthService} from "../../../services/auth/auth.service";


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
    imports: [

        RouterLink,
        RouterOutlet,
        AddModalComponent,

    ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})

export class BreadcrumbComponent implements OnInit{



  breadcrumbs: Array<{ label: string, url: string }> = [];
  private breadcrumbSubscription: Subscription | null = null;
  type: string | undefined;
  ticked: boolean = true;

  constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute, public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const exampleModal = document.getElementById('exampleModal');
    console.log(exampleModal);
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumbs$.subscribe(
      (breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      }
    );

      this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
/*          console.log('Obecny URL:', this.router.url);
          console.log('Breadcrumbs:', this.breadcrumbs);*/
      });
  }

  ngOnDestroy(): void {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }

  onSwitchChange(event: any) {
      this.ticked = event.target.checked;
  }



}

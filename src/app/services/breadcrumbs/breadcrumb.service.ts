import { Injectable } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbsSubject.next(this.createBreadcrumbs(this.activatedRoute.root));
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string}> = []): Array<{ label: string, url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let label = routeURL;

      if(label==='specs')label = 'Specifications';


      if (label !== '' && label!== 'undefined' && !breadcrumbs.some(b => b.label === label)) {
        if(label==='gens' || label==='vers') {
          let last = breadcrumbs.pop();
          if (last) {
            last.url  += "/" + label
            breadcrumbs.push(last);
          }
        }else if(label.includes('-')){
          const parm = label.split('-');
          Number(parm.pop());
          label = parm.join('-');
          breadcrumbs.push({label, url});
        }else{
          breadcrumbs.push({label, url});

        }

      }


      this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private formatLabel(label: string): string {
    if (label.startsWith('gens/')) {
      const genName = label.split('/')[1];
      return `Generacja ${genName}`;
    }

    if (label.startsWith('vers/')) {
      const versionName = label.split('/')[1];
      return `Wersja ${versionName}`;
    }

    if (label === 'archives') {
      return this.capitalizeFirstLetter(label);
    }

    return label;
  }

  public getBreadcrumbs(): Array<{ label: string, url: string }> {
    return this.breadcrumbsSubject.getValue();
  }
}



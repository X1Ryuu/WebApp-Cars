import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {VersionService} from '../../../services/version/version-service.service';
import {ItemComponent} from '../../items/item/item.component';
import {NgForOf} from '@angular/common';

import {Version} from "../../../entities/version/version";
import {BreadcrumbService} from "../../../services/breadcrumbs/breadcrumb.service";
import {ToastService} from "../../../services/toast/toast-service.service";

@Component({
  selector: 'app-bread-version',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
  ],
  templateUrl: './bread-version.component.html',
  styleUrl: './bread-version.component.css'
})
export class BreadVersionComponent implements OnInit{


  versions: Version[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private versionService: VersionService,
              private breadCrumbService: BreadcrumbService,
              private toastService: ToastService) {
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
    //  console.log(params.keys);
      let model = params.get('model');
      let generation = params.get('generation');
    //  console.log(this.brand, this.model, this.generation)
      if(generation){
        const [ name, id] = generation.split('-');
        let generationId = Number(id);
        this.versionService.getVersionsByGeneration(generationId).subscribe(versions => {
          this.versions = versions;
        })
      }else if(model){
        const [ name, id] = model.split('-');
        let modelId = Number(id);
        this.versionService.getVersionsByModel(modelId).subscribe(versions => {
          this.versions = versions;
        })
      }
    });
  }

  getNavigationPath(version: Version): void {
    if(version.engines && version.engines.length > 0) {
      this.router.navigate([this.breadCrumbService.getBreadcrumbs()[this.breadCrumbService.getBreadcrumbs().length-1].url, version.name+'-'+version.id]);
    }else{
      this.toastService.showMessage("No more data found");
    }
  }

}

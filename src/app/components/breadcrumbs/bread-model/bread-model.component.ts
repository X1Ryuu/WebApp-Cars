import {Component, OnInit} from '@angular/core';
import {Model} from '../../../entities/model/model';
import {ModelService} from '../../../services/model/model-service.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

import {ItemComponent} from '../../items/item/item.component';
import {BreadcrumbService} from "../../../services/breadcrumbs/breadcrumb.service";
import {ToastService} from "../../../services/toast/toast-service.service";



@Component({
  selector: 'app-bread-model',
  standalone: true,
  imports: [
    NgForOf,
    ItemComponent
  ],
  templateUrl: './bread-model.component.html',
  styleUrl: './bread-model.component.css'
})
export class BreadModelComponent implements OnInit{

  //brandName: string | null = '';
  models: any[] = [];


  constructor(private route: ActivatedRoute,
              private breadCrumbService: BreadcrumbService,
              private modelService: ModelService,
              private router: Router,
              private toastService: ToastService) {}

  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
     // console.log(params.keys);
      let brand = params.get('brand');

      //console.log("param: "+this.brand);
      if(brand){
        const [ name, id] = brand.split('-');
        let brandId = Number(id);
        let brandName = name;
        this.modelService.getModelsByBrand(brandId).subscribe(models => {
          this.models = models;
        })
      }

    });

  }



  getNavigationPath(model: Model): void {
    let url = this.breadCrumbService.getBreadcrumbs()[this.breadCrumbService.getBreadcrumbs().length-1].url;
    if (model.generations && model.generations.length > 0) {
      this.router.navigate([url, model.name+'-'+model.id, 'gens']);
    } else if (model.versions && model.versions.length > 0) {
      this.router.navigate([url, model.name+'-'+model.id, 'vers']);
    }else if (model.engines && model.engines.length > 0) {
      this.router.navigate([url, model.name+'-'+model.id, 'engines']);
    }else{
      this.toastService.showMessage("No more data found");
    }
  }
}

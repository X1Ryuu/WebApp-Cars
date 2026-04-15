import {Component, OnInit} from '@angular/core';
import {ItemComponent} from '../../items/item/item.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import {GenerationService} from "../../../services/generation/generation-service.service";
import {Generation} from "../../../entities/generation/generation";
import {BreadcrumbService} from "../../../services/breadcrumbs/breadcrumb.service";
import {ToastService} from "../../../services/toast/toast-service.service";

@Component({
  selector: 'app-bread-generation',
  standalone: true,
  imports: [
    ItemComponent,


  ],
  templateUrl: './bread-generation.component.html',
  styleUrl: './bread-generation.component.css'
})
export class BreadGenerationComponent implements OnInit{
  generations: any[] = [];
  constructor(private route: ActivatedRoute,
              private generationService: GenerationService,
              private router: Router,
              private breadCrumbService: BreadcrumbService,
              private toastService: ToastService) {}

  ngOnInit(): void {
    // Pobierz parametr brandId z trasy
    this.route.paramMap.subscribe(params => {

      let brand = params.get('brand');
      let model = params.get('model');
      if(model){
        const [ name, id] = model.split('-');
        let modelName = name;
        let modelId = Number(id);
        this.generationService.getGenerationsByModel(modelId).subscribe(generations => {
          this.generations = generations;
        })
      }

    });

  }

  getNavigationPath(generation: Generation): void {
    let url = this.breadCrumbService.getBreadcrumbs()[this.breadCrumbService.getBreadcrumbs().length-1].url;
    if (generation.versions && generation.versions.length > 0) {
      this.router.navigate([url, generation.name+'-'+generation.id]);
    }else{
      this.toastService.showMessage("No more data found");
    }
  }

}

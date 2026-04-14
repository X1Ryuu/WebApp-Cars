import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EngineService} from '../../../services/engine/engine-service.service';
import {ItemComponent} from '../../items/item/item.component';

import {BreadcrumbService} from "../../../services/breadcrumbs/breadcrumb.service";
import {Engine} from "../../../entities/engine/engine";

@Component({
  selector: 'app-bread-engine',
  standalone: true,
  imports: [
    ItemComponent,
    RouterLink
  ],
  templateUrl: './bread-engine.component.html',
  styleUrl: './bread-engine.component.css'
})
export class BreadEngineComponent implements OnInit{

  engines: Engine[] = [];
  pbEngines: Engine[] = [];
  dieselEngines: Engine[] = [];
  pluginPbEngines: Engine[] = [];
  pluginDieselEngines: Engine[] = [];
  electricEngines: Engine[] = [];


  constructor(private route: ActivatedRoute, private engineService: EngineService, private breadCrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let generation = params.get('generation');
      let version = params.get('version');
      let model = params.get('model');

      if(version){
        const parts = version.split('-');
        const id = Number(parts.pop());
        const slug = parts.join('-');
        console.log("yas");
        this.engineService.getEnginesByVersion(id).subscribe(engines => {
          this.engines = engines;
          this.pluginPbEngines = this.engines.filter(engine => engine.gasoline === 'Plug-in');
          this.dieselEngines = this.engines.filter(engine => engine.gasoline === 'Diesel');
          this.pbEngines = this.engines.filter(engine => engine.gasoline === 'Pb');
          this.pluginDieselEngines = this.engines.filter(engine => engine.gasoline === 'Plug-in Diesel');
          this.electricEngines = this.engines.filter(engine => engine.gasoline === 'Electric');

          console.log(this.pbEngines)

        })
        console.log(this.engines)
      }else if(!version && generation){
        const parts = generation.split('-');
        const id = Number(parts.pop());
        const slug = parts.join('-');
        this.engineService.getEnginesByGeneration(id).subscribe(engines => {
          this.engines = engines;
        })
      }else if(model){
        const parts = model.split('-');
        const id = Number(parts.pop());
        const slug = parts.join('-');
        this.engineService.getEnginesByModel(id).subscribe(engines => {
          this.engines = engines;
        })
      }
    });
  }



}

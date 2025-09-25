import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BrandService} from '../../../../services/brand/brand-service.service';
import {ModelService} from '../../../../services/model/model-service.service';
import {VersionService} from '../../../../services/version/version-service.service';

import {Generation} from "../../../../entities/generation/generation";
import {Model} from "../../../../entities/model/model";
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-car-add-pills',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    NgClass,

  ],
  templateUrl: './car-add-pills.component.html',
  styleUrl: './car-add-pills.component.css'
})
export class CarAddPillsComponent implements OnInit {
  activeTab: string = 'brands'; // Aktywna zakładka
  successMessage: string | null = null;
  errorMessage: string | null = null;
  activeForm: FormGroup | undefined;
  map: Map<string, FormGroup> = new Map<string, FormGroup>
  brands: any[] = [];
  models: any[] = [];
  generations: any[] = [];
  versions: any[] = [];
  engines: any[] = [];
  years: string[] = [];



  brandForm!: FormGroup;
  modelForm!: FormGroup;
  generationForm!: FormGroup;
  versionForm!: FormGroup;
  engineForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private brandService: BrandService,
              private modelService: ModelService,
              private versionService: VersionService,
              ) {}

  ngOnInit(): void {
    this.generations = [{id:0, name: ''}];
 //   this.brand.id = 0;
    this.years.push("now");
    for(let i = new Date().getFullYear(); i >= 1900; i--){
      this.years.push(i.toString());
    }
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['']
    });

    this.modelForm = this.fb.group({
      brandId: ['', Validators.required],
      name: ['', Validators.required],
/*      startYear: ['', Validators.required],
      endYear: ['', Validators.required]*/
    });

    this.generationForm = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      name: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    });


    this.versionForm = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      generationId: ['', Validators.required],
      name: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    });


    this.engineForm = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      generationId: ['', Validators.required],
      versionId: ['', Validators.required],
      name: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]});

    this.loadBrands();

    this.map.set('brands', this.brandForm);
    this.map.set('models', this.modelForm);
    this.map.set('generations', this.generationForm);
    this.map.set('versions', this.versionForm);
    this.map.set('engines', this.engineForm);
    this.setActiveTab('brands');
  }

  setActiveTab(tab: string) {
    if(tab!=this.activeTab) this.resetForms();
    this.activeTab = tab;
    this.activeForm = this.map.get(tab);
  }


  resetForms(){
    this.brandForm.reset();
    this.modelForm.reset();
    this.generationForm.reset();
    this.versionForm.reset();
    this.engineForm.reset();

  }


  loadBrands() {
    this.brandService.findAll().subscribe((brands) => {
      this.brands = brands;
    });

  }

  onBrandChange() {
    this.models = [];
    this.generations = [];
    let brandId= 0;
    if (this.activeForm) {
      brandId = this.activeForm.get('brandId')?.value;
      this.http.get<Model[]>(`http://localhost:8080/api/models/${brandId}`).subscribe({
        next: data => this.models = data,
        error: err => this.errorMessage = 'Error loading models'
      });
    }


  }

  onModelChange(){
    this.generations = [];
    if (this.activeForm) {
      let modelId= 0;

      modelId = this.activeForm.get('modelId')?.value;
      if(this.activeTab == 'versions') {
        this.http.get<Generation[]>(`http://localhost:8080/api/generations/${modelId}`).subscribe({
          next: data => this.generations = [{id: null, name: 'Generation not selected'}, ...data],
          error: err => this.errorMessage = 'Error loading generations'
        });
      }
    }

  }

  submitBrand(){
  //  console.log(this.brandForm.value)
    if (this.brandForm.valid) {
      this.brandService.addBrand(this.brandForm.value).subscribe({
        next: (response) => {
          alert('Brand added successfully');
          this.resetForms();
        },
        error: (error) => {
          console.log(this.brandForm.value);
          console.error('Error adding brand:', error);
          alert('Failed to add brand');
        }
      });
    }
  }

  submitModel() {

    const modelData = {
      name: this.modelForm.value.name,
      brandName: this.modelForm.value.brandName
    };

      if (this.modelForm.valid) {
        console.log("Valid model form")
        this.modelService.addModel(modelData).subscribe({
          next: (response) => {
            alert('Model added successfully');
            this.resetForms();
          },
          error: (error) => {
            console.log(this.modelForm.value);
            console.error('Error adding brand:', error);
            alert('Failed to add brand');
          }
        });
      }
  }

  submitGeneration(){
    console.log(this.generationForm.value, this.generationForm.valid)
    if(this.generationForm.valid){
      //this.generationService.addGeneration()
      //this.generationService
    }
  }


  submitVersion() {
    console.log(this.versionForm.value)
    if (this.versionForm.valid) {
      this.versionService.addVersion(this.versionForm.value).subscribe({
        next: (response) => {
          alert('Version added successfully');
          this.resetForms();
        },
        error: (error) => {
          console.log(this.versionForm.value);
          console.error('Error adding brand:', error);
          alert('Failed to add brand');
        }
      });
    }
  }
  submitEngine(){}
  submitEngDesc(){}

}

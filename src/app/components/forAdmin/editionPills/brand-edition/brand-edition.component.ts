import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Brand}  from '../../../../entities/brand/brand';
import {BrandService} from '../../../../services/brand/brand-service.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment.development';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-brand-edition',
  standalone: true,
  imports: [

    /*    RouterLink,*/

    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './brand-edition.component.html',
  styleUrl: './brand-edition.component.css'
})
export class BrandEditionComponent {
  brands: Brand[] | undefined;
  brandAddForm: FormGroup;
  brandEditForm: FormGroup;
  url: string = environment.apiUrl
  errorMessage: string | null = null;
  selectedBrands: number[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder,
              private brandService: BrandService, private oauthService: OAuthService) {
    this.brandAddForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });
    this.brandEditForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.brandService.findAll().subscribe(data => {
      this.brands = data;
    });
  }

  toggleBrandSelection(brandId: number): void {
    const index = this.selectedBrands.indexOf(brandId);

    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brandId);
    }
    console.log(this.selectedBrands, index)
  }

  changed(id: number){
    console.log(id)
  }
  reallyTouched(){
    return (this.brandAddForm.get('name')?.touched
      && this.brandAddForm.get('logo')?.touched
      && !this.brandAddForm.valid);
  }

/*
    onOpenModal(){
      this.brandService.addBrand(brand: NgForm).subscribe
    }
  */
  onOpenModal(){}
  onOpenModalEdit(brand: Brand){}


  onSubmit() {
    if(!this.oauthService.hasValidAccessToken())this.oauthService.refreshToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
    });
    console.log('headers: '+JSON.stringify(headers));
    console.log('link: '+this.url);
    console.log('clicked & data: '+JSON.stringify(this.brandAddForm.value));
    if (this.brandAddForm.valid && this.oauthService.getAccessToken()) {
/*      this.brandService.addBrand(this.brandAddForm.value, headers).subscribe(*/
      this.http.post(`${this.url}/brands/add`, this.brandAddForm.value,{ headers,  responseType: 'text' }).subscribe(
        response => {
          this.errorMessage = null;
          console.log('Registration successful:', response);
        },
        error => {
          if (error.status === 409) {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
    } else {
      console.log("Form is invalid or passwords don't match.");
    }
  }
}

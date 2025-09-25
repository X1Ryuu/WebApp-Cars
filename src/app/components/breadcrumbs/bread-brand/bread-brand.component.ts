import {Component, OnInit} from '@angular/core';
import {Brand} from '../../../entities/brand/brand';
import {BrandService} from '../../../services/brand/brand-service.service';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {ItemComponent} from "../../items/item/item.component";
import {BreadcrumbService} from "../../../services/breadcrumbs/breadcrumb.service";

@Component({
  selector: 'app-bread-brand',
  standalone: true,
    imports: [
        ItemComponent,


    ],
  templateUrl: './bread-brand.component.html',
  styleUrl: './bread-brand.component.css'
})
export class BreadBrandComponent implements OnInit{


  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    public authService: AuthService,
    private router: Router,
    private breadCrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.brandService.findAll().subscribe((brands) => {
      this.brands = brands;
    });
  }

  getNavigationPath(brand: Brand): void {
    if(brand.models && brand.models.length > 0) {
      this.router.navigate([this.breadCrumbService.getBreadcrumbs()[this.breadCrumbService.getBreadcrumbs().length-1].url, brand.name+'-'+brand.id]);
    }
  }
}

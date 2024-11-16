import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubcategoryModel } from '../../models/SubcategoryModel';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-subcategories-overview',
  templateUrl: './subcategories-overview.component.html',
  styleUrl: './subcategories-overview.component.scss'
})
export class SubcategoriesOverviewComponent {
  subcategories: SubcategoryModel[];

  constructor(
    private route: ActivatedRoute,
    private subcategoryService: SubcategoryService
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      const categoryIdParam = params.get('categoryId');
      if (categoryIdParam) {
        this.getSubcategoriesByCategory(+categoryIdParam);
      }})
  }

  getSubcategoriesByCategory(categoryId: number){
    this.subcategoryService.getSubcategoriesByCategory(categoryId).subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
      }
    )}
}

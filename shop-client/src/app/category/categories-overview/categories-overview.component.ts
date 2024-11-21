import { Component, ViewChild } from '@angular/core';
import { CategoryModel } from '../../models/CategoryModel';
import { CategoryService } from '../../services/category.service';
import { tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrl: './categories-overview.component.scss'
})
export class CategoriesOverviewComponent {
  categories: CategoryModel[] = [];
  pagedCategories: CategoryModel[] = [];
  subcategories: CategoryModel[] = [];

  constructor (
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {}

  ngAfterViewInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  getSubcategoriesByCategory(categoryId: number) {
    this.subcategoryService.getSubcategoriesByCategory(categoryId).subscribe((subcategories) => {
      this.subcategories = subcategories;
    }
  )}
}

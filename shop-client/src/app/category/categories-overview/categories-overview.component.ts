import { Component, ViewChild } from '@angular/core';
import { CategoryModel } from '../../models/CategoryModel';
import { CategoryService } from '../../services/category.service';
import { tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrl: './categories-overview.component.scss'
})
export class CategoriesOverviewComponent {
  categories: CategoryModel[] = [];
  filteredCategories: CategoryModel[] = [];
  pagedCategories: CategoryModel[] = [];
  currentPage: number = 0;
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private categoryService: CategoryService) {}

  ngAfterViewInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.filteredCategories = categories;
        this.updatePagedCategories();
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(filterValue)
    );
    this.currentPage = 0;
    this.updatePagedCategories(); 
  }

  updatePagedCategories() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCategories = this.filteredCategories.slice(startIndex, endIndex);
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedCategories();
  }
}

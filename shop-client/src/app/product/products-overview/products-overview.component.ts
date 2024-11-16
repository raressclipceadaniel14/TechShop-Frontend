import { Component, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.scss'
})
export class ProductsOverviewComponent {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  pagedProducts: ProductModel[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      const subcategoryIdParam = params.get('subcategoryId');
      if (subcategoryIdParam) {
        this.getProductsBySubcategory(+subcategoryIdParam);
      }})
  }

  getProductsBySubcategory(subcategoryId: number){
    this.productService.getProductsBySubcategory(subcategoryId).subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.updatePagedProducts();
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(filterValue)
    );
    this.currentPage = 0;
    this.updatePagedProducts(); 
  }

  updatePagedProducts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedProducts();
  }
}

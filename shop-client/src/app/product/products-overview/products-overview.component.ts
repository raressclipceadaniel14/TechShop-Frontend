import { Component, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  pagedProducts: ProductModel[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  searchText: string = '';
  predictiveResults: string[] = [];
  showSuggestions: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public sessionService: SessionService
  ) {}

  isAdmin() {
    return this.sessionService.isAdmin();
  }

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      const subcategoryIdParam = params.get('subcategoryId');
      if (subcategoryIdParam) {
        this.getProductsBySubcategory(+subcategoryIdParam);
      }
    });
  }

  getProductsBySubcategory(subcategoryId: number) {
    this.productService.getProductsBySubcategory(subcategoryId).subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.updatePagedProducts();
      }
    );
  }

  applyFilter(event: Event) {
    const input = (event.target as HTMLInputElement);
    const filterValue = input.value.toLowerCase();
    this.searchText = input.value;
  
    if (!filterValue.trim()) {
      this.filteredProducts = [...this.products];
      this.predictiveResults = [];
      this.showSuggestions = false;
      this.currentPage = 0;
      this.updatePagedProducts();
      return;
    }
  
    const threshold = 0.1;
  
    if (filterValue.length === 1) {
      // Fallback to basic includes for single letter input
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(filterValue)
      );
  
      this.predictiveResults = this.products
        .filter(p => p.name.toLowerCase().includes(filterValue))
        .map(p => p.name)
        .slice(0, 5);
  
    } else {
      // Use Dice coefficient
      this.filteredProducts = this.products.filter(product =>
        this.diceCoefficient(product.name, filterValue) > threshold
      );
  
      this.predictiveResults = this.products
        .map(p => ({
          name: p.name,
          score: this.diceCoefficient(p.name, filterValue)
        }))
        .filter(entry => entry.score > threshold)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(entry => entry.name);
    }
  
    this.showSuggestions = this.predictiveResults.length > 0;
    this.currentPage = 0;
    this.updatePagedProducts();
  }
  
  

  selectSuggestion(suggestion: string) {
    this.searchText = suggestion;
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(suggestion.toLowerCase())
    );
    this.predictiveResults = [];
    this.showSuggestions = false;
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

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe();
  }

  private getBigrams(str: string): string[] {
    const s = str.toLowerCase();
    const bigrams: string[] = [];
    for (let i = 0; i < s.length - 1; i++) {
      bigrams.push(s.slice(i, i + 2));
    }
    return bigrams;
  }

  private diceCoefficient(str1: string, str2: string): number {
    const bigrams1 = this.getBigrams(str1);
    const bigrams2 = this.getBigrams(str2);

    const intersection = bigrams1.filter(bigram => {
      const index = bigrams2.indexOf(bigram);
      if (index !== -1) {
        bigrams2.splice(index, 1);
        return true;
      }
      return false;
    });

    return (2.0 * intersection.length) / (bigrams1.length + bigrams2.length);
  }
}

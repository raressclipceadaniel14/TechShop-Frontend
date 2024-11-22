import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductSaveModel } from '../../models/ProductSaveModel';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/CategoryModel';
import { SubcategoryService } from '../../services/subcategory.service';
import { SubcategoryModel } from '../../models/SubcategoryModel';
import { ProviderModel } from '../../models/ProviderModel';
import { ProviderService } from '../../services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  categories: CategoryModel[] = [];
  subcategories: SubcategoryModel[] = [];
  providers: ProviderModel[] = [];

  ngOnInit() {
    this.getAllCategories();
    this.getAllProviders();
  }

  addProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    subcategory: new FormControl('', [Validators.required]),
    provider: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  imagePreview: string;
  base64Image: string;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private providerService: ProviderService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  submit() {
    const name = this.addProductForm.get('name').value;
    const category = this.addProductForm.get('category').value;
    const subcategory = this.addProductForm.get('subcategory').value;
    const provider = this.addProductForm.get('provider').value;
    const price = this.addProductForm.get('price').value;
    const description = this.addProductForm.get('description').value;

    var product: ProductSaveModel = {
      name: name,
      description: description,
      price: Number(price),
      isAvailable: true,
      subCategoryId: Number(subcategory),
      providerId: 1,
      picture: ''
    }

    this.productService.addProduct(product).subscribe(() => {
      this.addProductForm.reset();
      this.snackBar.open('Product successfully saved', 'Dismiss', {
        duration: 3000,
      });
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.base64Image = e.target.result.split(',')[1];
      };

      reader.readAsDataURL(file);
    }
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  onCategoryChange(categoryId: number) {
    this.getAllSubcategoriesByCategoryId(categoryId);
  }

  getAllSubcategoriesByCategoryId(categoryId: number) {
    this.subcategoryService.getSubcategoriesByCategory(categoryId).subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
      }
    );
  }

  getAllProviders() {
    this.providerService.getAllProviders().subscribe((providers) => {
      this.providers = providers;
    });
  }
}

import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../../models/ProductModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { CategoryModel } from '../../models/CategoryModel';
import { SubcategoryModel } from '../../models/SubcategoryModel';
import { ProviderModel } from '../../models/ProviderModel';
import { ProviderService } from '../../services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  product: ProductModel;
  categories: CategoryModel[] = [];
  subcategories: SubcategoryModel[] = [];
  providers: ProviderModel[] = [];

  editProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    subcategory: new FormControl('', [Validators.required]),
    provider: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isAvailable: new FormControl(false, [Validators.required]),
  });

  imagePreview: string;
  base64Image: string;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private providerService: ProviderService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productIdParam = params.get('productId');
      if (productIdParam) {
        this.getProduct(+productIdParam);
        this.getAllCategories();
        this.getAllProviders();
      }
    });
  }

  submit() {
    const name = this.editProductForm.get('name').value;
    const category = this.editProductForm.get('category').value;
    const subcategory = this.editProductForm.get('subcategory').value;
    const provider = this.editProductForm.get('provider').value;
    const price = this.editProductForm.get('price').value;
    const description = this.editProductForm.get('description').value;
    const isAvailable = this.editProductForm.get('isAvailable').value;

    var product: ProductModel = {
      id: this.product.id,
      name: name,
      description: description,
      price: Number(price),
      isAvailable: Boolean(isAvailable),
      subCategoryId: 1,
      providerId: 1,
      picture: ''
    }

    this.productService.updateProduct(product).subscribe(() => {
      const redirectUrl = `/products/${this.product.subCategoryId}`;
      this.router.navigate([redirectUrl]);
      this.snackBar.open('Product successfully saved', 'Dismiss', {
        duration: 3000,
      });
    });
  }

  delete() {
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      const redirectUrl = `/products/${this.product.subCategoryId}`;
      this.router.navigate([redirectUrl]);
      this.snackBar.open('Product successfully deleted', 'Dismiss', {
        duration: 3000,
      });
    });
  }

  getProduct(productId: number) {
    this.productService.getProductById(productId).subscribe(
      (product: ProductModel) => {
        this.product = product;
        this.productService.getCategoryBySubcategory(product.subCategoryId).subscribe((category: CategoryModel) => {
          this.subcategoryService.getSubcategoriesByCategory(category.id).subscribe((subcategories: SubcategoryModel[]) => {
            this.subcategories = subcategories;
            this.imagePreview = product.picture;
            this.populateForm(category);
          })
        });
      }
    )
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

  populateForm(category: CategoryModel) {
    this.editProductForm.patchValue({
      name: this.product.name,
      category: category.id.toString(),
      subcategory: this.product.subCategoryId.toString(),
      provider: this.product.providerId.toString(),
      price: this.product.price.toString(),
      description: this.product.description,
      isAvailable: this.product.isAvailable
    });
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

  compareFunction(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id == o2.id : o1 == o2;
  }
}

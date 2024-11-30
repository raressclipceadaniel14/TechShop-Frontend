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
  categoriesOptions: { id: string; viewValue: string }[] = [];
  subCategoriesOptions: { id: string; viewValue: string }[] = [];
  providersOptions: { id: string; viewValue: string }[] = [];
  subcategoryValue: string;
  providerValue: string;

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
    const picture = this.imagePreview;

    var product: ProductModel = {
      id: this.product.id,
      name: name,
      description: description,
      price: Number(price),
      isAvailable: Boolean(isAvailable),
      subCategoryId: parseInt(subcategory),
      providerId: parseInt(provider),
      picture: picture
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
            this.providerService.getAllProviders().subscribe((providers) => {
              subcategories.forEach(subcategory => {
                this.subCategoriesOptions.push({ 
                  id: subcategory.id.toString(), 
                  viewValue: subcategory.name
                });
                this.subcategoryValue = subcategory.id.toString();
              });
              providers.forEach(provider => {
                this.providersOptions.push({ 
                  id: provider.id.toString(), 
                  viewValue: provider.name
                });
                this.providerValue = provider.id.toString();
              });
              this.imagePreview = product.picture;
            });
          })
          this.populateForm(category);
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
      isAvailable: this.product.isAvailable,
    });
    console.log(this.editProductForm);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        categories.forEach(category => {
          this.categoriesOptions.push({ 
            id: category.id.toString(), 
            viewValue: category.name 
          });
        });
      }
    );
  }

  onCategoryChange(selectedValue: string) {
    this.subCategoriesOptions = [];
    this.subcategoryService.getSubcategoriesByCategory(parseInt(selectedValue)).subscribe(
      (subcategories) => {
        subcategories.forEach(subcategory => {
          this.subCategoriesOptions.push({ 
            id: subcategory.id.toString(), 
            viewValue: subcategory.name
          });
        });
        this.editProductForm.patchValue({subcategory: this.subCategoriesOptions[0].id});
      }
    );
  }

  compareFunction(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id == o2.id : o1 == o2;
  }
}

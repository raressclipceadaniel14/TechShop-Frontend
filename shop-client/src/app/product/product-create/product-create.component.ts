import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductSaveModel } from '../../models/ProductSaveModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/CategoryModel';
import { SubcategoryService } from '../../services/subcategory.service';
import { SubcategoryModel } from '../../models/SubcategoryModel';
import { ProviderModel } from '../../models/ProviderModel';
import { ProviderService } from '../../services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel } from '../../models/ProductModel';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
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
    stock: new FormControl('', [Validators.required]),
  });

  imagePreview: string;
  base64Image: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private providerService: ProviderService,
    private snackBar: MatSnackBar,
    private router: Router,
    public notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllProviders();
  }

  submit() {
    const name = this.editProductForm.get('name').value;
    const category = this.editProductForm.get('category').value;
    const subcategory = this.editProductForm.get('subcategory').value;
    const provider = this.editProductForm.get('provider').value;
    const price = this.editProductForm.get('price').value;
    const description = this.editProductForm.get('description').value;
    const stock = this.editProductForm.get('stock').value;
    const picture = this.imagePreview;

    var product: ProductModel = {
      name: name,
      description: description,
      price: Number(price),
      stock: Number(stock),
      subCategoryId: parseInt(subcategory),
      providerId: parseInt(provider),
      picture: picture
    }

    this.productService.addProduct(product).subscribe(() => {
      this.notificationService.showNotification('Added to favorites successfully!');
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
        categories.forEach(category => {
          this.categoriesOptions.push({ 
            id: category.id.toString(), 
            viewValue: category.name 
          });
        });
      }
    );
  }

  getAllProviders() {
    this.providerService.getAllProviders().subscribe((providers) => {
      providers.forEach(provider => {
        this.providersOptions.push({ 
          id: provider.id.toString(), 
          viewValue: provider.name 
        });
      });
    })
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

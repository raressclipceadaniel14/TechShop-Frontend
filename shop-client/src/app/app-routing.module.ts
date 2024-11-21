import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsOverviewComponent } from './product/products-overview/products-overview.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { CategoriesOverviewComponent } from './category/categories-overview/categories-overview.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { SubcategoryCreateComponent } from './subcategory/subcategory-create/subcategory-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },,
  {
    path: 'products/:subcategoryId',
    component: ProductsOverviewComponent,
  },
  {
    path: 'product/create',
    component: ProductCreateComponent,
  },
  {
    path: 'categories',
    component: CategoriesOverviewComponent,
  },
  {
    path: 'category/create',
    component: CategoryCreateComponent,
  },
  {
    path: 'subcategory/create',
    component: SubcategoryCreateComponent, 
  },
  {
    path: 'product/edit/:productId',
    component: ProductEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

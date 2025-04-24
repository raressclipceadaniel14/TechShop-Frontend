import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductsOverviewComponent } from './product/products-overview/products-overview.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { CategoriesOverviewComponent } from './category/categories-overview/categories-overview.component';
import { SubcategoryCreateComponent } from './subcategory/subcategory-create/subcategory-create.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { FloatingMenuComponent } from './shared/floating-menu/floating-menu.component';
import { RegisterComponent } from './register/register.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { SelectFieldComponent } from './shared/select-field/select-field.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { SpecificationSearchComponent } from './specification-search/specification-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    ProductCardComponent,
    ProductsOverviewComponent,
    ProductCreateComponent,
    CategoriesOverviewComponent,
    SubcategoryCreateComponent,
    CategoryCreateComponent,
    ProductEditComponent,
    FloatingMenuComponent,
    RegisterComponent,
    HomeComponent,
    ProductDetailsComponent,
    SelectFieldComponent,
    FavoriteComponent,
    CartComponent,
    OrderComponent,
    AdminDashboardComponent,
    OrderCardComponent,
    SpecificationSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatRippleModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatError,
    MatLabel,
    MatMenu,
    MatToolbarModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatRippleModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatError,
    MatLabel,
    MatToolbarModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}

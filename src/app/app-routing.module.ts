import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/guards/auth-guard.service';
import { LogoutModuleComponent } from './logout-module/logout-module.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NewBulkProductsComponent } from './new-bulk-products/new-bulk-products.component';
import { AdminGuardService } from './Services/guards/admin-guard.service';
import { UsersListComponent } from './users-list/users-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
  {path: "", component:HomePageComponent, canActivate:[AuthGuardService]},
  {path: "cart", component:CartComponent, canActivate:[AuthGuardService]},
  {path: "products/:id/details", component:ProductDetailsComponent, canActivate:[AuthGuardService]},
  {path: "signup", component:CreateAccountComponent},
  {path: "login", component:LoginComponent},
  {path: "logout", component:LogoutModuleComponent, canActivate:[AuthGuardService]},
  {path: "checkout", component:CheckoutComponent},
  {path: "profile", component:MyProfileComponent, canActivate:[AuthGuardService]},
  {path: "products/add", component:NewBulkProductsComponent, canActivate:[AuthGuardService, AdminGuardService]},
  {path: "users", component: UsersListComponent, canActivate:[AuthGuardService, AdminGuardService]},
  {path: "products/:id/edit", component: ProductEditComponent, canActivate:[AuthGuardService, AdminGuardService]},
  {path: "stats", component: StatsComponent, canActivate:[AuthGuardService, AdminGuardService]},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

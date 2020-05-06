import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/guards/auth-guard.service';
import { LogoutModuleComponent } from './logout-module/logout-module.component';


const routes: Routes = [
  {path: "", component:HomePageComponent, canActivate:[AuthGuardService]},
  {path: "cart", component:CartComponent, canActivate:[AuthGuardService]},
  {path: "details", component:ProductDetailsComponent, canActivate:[AuthGuardService]},
  {path: "signup", component:CreateAccountComponent},
  {path: "login", component:LoginComponent},
  {path: "logout", component:LogoutModuleComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

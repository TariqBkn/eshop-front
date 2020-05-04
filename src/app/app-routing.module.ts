import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';


const routes: Routes = [
  {path: "", component:HomePageComponent},
  {path: "cart", component:CartComponent},
  {path: "details", component:ProductDetailsComponent},
  {path: "createAccount", component:CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

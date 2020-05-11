import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { TokenInterceptorService } from './Services/interceptors/token-interceptor.service'
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule} from '@angular/material/input';
import {  MatCardModule } from '@angular/material/card'
import { MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from "ngx-spinner";
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar' 
import {MatButtonModule} from '@angular/material/button';
import { LogoutModuleComponent } from './logout-module/logout-module.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatStepperModule} from '@angular/material/stepper';
import { SimilarProductsComponent } from './similar-products/similar-products.component';
import { OrderLineComponent } from './order-line/order-line.component';
import {MatListModule} from '@angular/material/list';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { NewCommentComponent } from './new-comment/new-comment.component';

 @NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HomePageComponent,
    TopBarComponent,
    CartComponent,
    ProductComponent,
    ProductDetailsComponent,
    CreateAccountComponent,
    LoginComponent,
    LogoutModuleComponent,
    CheckoutComponent,
    SimilarProductsComponent,
    OrderLineComponent,
    CommentComponent,
    CommentsComponent,
    NewCommentComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatStepperModule,
    MatListModule,
    
   ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

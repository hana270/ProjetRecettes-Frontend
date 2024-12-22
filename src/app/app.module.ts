import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateIngredientComponent } from './update-ingredient/update-ingredient.component';
import { RechercheParRecetteComponent } from './recherche-par-recette/recherche-par-recette.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeRecettesComponent } from './liste-recettes/liste-recettes.component';
import { UpdateRecetteComponent } from './update-recette/update-recette.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor }from './services/token.interceptor';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    AddIngredientComponent,
    UpdateIngredientComponent,
    RechercheParRecetteComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeRecettesComponent,
    UpdateRecetteComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    VerifEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    },
      
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

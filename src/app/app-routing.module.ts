import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { UpdateIngredientComponent } from './update-ingredient/update-ingredient.component';
import { RechercheParRecetteComponent } from './recherche-par-recette/recherche-par-recette.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeRecettesComponent } from './liste-recettes/liste-recettes.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { IngredientGuard } from './ingredient.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';


const routes: Routes = [

    { path: "ingredients", component: IngredientsComponent }
  , { path: "add-ingredient", component: AddIngredientComponent, canActivate: [IngredientGuard] }
  , { path: "", redirectTo: "ingredients", pathMatch: "full" }

  , { path: 'updateIngredient/:id', component: UpdateIngredientComponent }
  , { path: "rechercheParRecette", component: RechercheParRecetteComponent }
  , { path: "rechercheParNom", component: RechercheParNomComponent },
    { path: "listeRecettes", component: ListeRecettesComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'app-forbidden', component: ForbiddenComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'verifEmail', component: VerifEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

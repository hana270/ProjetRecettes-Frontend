import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/Ingredient.model';
import { Recette } from '../model/recette.model';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-recherche-par-recette',
  templateUrl: './recherche-par-recette.component.html',
  styles: ``
})
export class RechercheParRecetteComponent implements OnInit {

  ingredients! : Ingredient[];
  idRecette! : number; // Correction ici
  recettes! : Recette[];
 
  constructor(private ingredientService: IngredientService) {}
 
  ngOnInit(): void {
    this.ingredientService.listeRecettes().subscribe(rects => {
      console.log('Réponse du serveur :', rects);
      if (rects && Array.isArray(rects)) {
          this.recettes = rects; // Assurez-vous que rects est un tableau
      } else if (rects?._embedded?.recettes) {
          this.recettes = rects._embedded.recettes;
      } else {
          console.error('Les recettes ne sont pas disponibles dans la réponse');
      }
  });
     
  }
 
 
  onChange() {
    console.log('Recette sélectionnée ID :', this.idRecette);
    this.ingredientService.rechercherParRecette(this.idRecette)
        .subscribe(prods => {
            console.log('Ingrédients reçus :', prods);
            this.ingredients = prods;
        }, error => {
            console.error('Erreur lors de la récupération des ingrédients :', error);
        });
}

}

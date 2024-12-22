import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../model/Ingredient.model';
import { apiURL } from '../config';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {
 nomIngredient! :string;
 ingredients! :Ingredient[];
allIngredients!:Ingredient[];
searchTerm!:string;
  constructor(private ingredientService: IngredientService) {}
 
  ngOnInit(): void {
    
    this.ingredientService.listeIngredients().subscribe(prods =>{
    console.log(prods);
    this.ingredients = prods;
    
  });
  }



    rechercherIngredients(){
  this.ingredientService.rechercherParNom(this.nomIngredient).
      subscribe(prods => { this.ingredients = prods;
      console.log(prods)});
      }
 
 
      onKeyUp(filterText: string) {
        if (!filterText) {
          this.ingredients = this.allIngredients; // Remettre tous les ingrédients si le champ est vide
          return;
        }
      
        this.ingredients = this.allIngredients.filter(item => 
          item.nomIngredient?.toLowerCase().includes(filterText.toLowerCase())
        );
      }
          
}

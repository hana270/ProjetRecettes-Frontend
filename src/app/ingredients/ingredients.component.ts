import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/Ingredient.model';
import { IngredientService } from '../services/ingredient.service';
import { Image } from '../model/image.model';
import { AuthService } from '../services/auth.service'; // Ensure AuthService is imported

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
})
export class IngredientsComponent implements OnInit {
  ingredients?: Ingredient[];
  /*
  apiurl:string='http://localhost:8080/ingredients/api';
  */

  // Change authService to public
  constructor(
    private ingredientService: IngredientService,
    public authService: AuthService // AuthService should be public to access in template
  ) {}

  ngOnInit(): void {
    this.chargerIngredients();
  }
  /*
chargerIngredients(){
  this.ingredientService.listeIngredient().subscribe(ings => {
  this.ingredients = ings;
}

*/
  chargerIngredients(): void {
    this.ingredientService.listeIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;

      // Fetch image for each ingredient
      this.ingredients?.forEach((ingredient) => {
        if (ingredient.idIngredient) {
          this.ingredientService
            .getImagesForIngredient(ingredient.idIngredient)
            .subscribe((img: Image[]) => {
              // Check if an image is available
              if (img.length > 0) {
                ingredient.imageStr =
                  'data:' + img[0].type + ';base64,' + img[0].image;
              } else {
                ingredient.imageStr = ''; // Initialize with empty string if no image
                console.log(
                  `No image found for ingredient ${ingredient.nomIngredient}`
                );
              }
            });
        }
      });
    });
  }

  supprimerIngredient(ing: Ingredient): void {
    const conf = confirm('Are you sure you want to delete this ingredient?');
    if (conf) {
      if (ing.idIngredient) {
        console.log(
          `Attempting to delete ingredient with ID: ${ing.idIngredient}`
        );
        this.ingredientService.supprimerIngredient(ing.idIngredient).subscribe(
          () => {
            console.log('Ingredient deleted successfully');
            this.chargerIngredients(); // Reload list after deletion
          },
          (error) => {
            console.error('Error deleting ingredient:', error);
          }
        );
      }
    }
  }
}

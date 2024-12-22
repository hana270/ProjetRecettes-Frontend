import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/Ingredient.model';
import { IngredientService } from '../services/ingredient.service';
import { Recette } from '../model/recette.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html'
})
export class AddIngredientComponent implements OnInit {
  newIngredient = new Ingredient();
  recettes!: Recette[];
  newIdRec!: number;
  uploadedImage!: File;
  imagePath: any;

  constructor(private ingredientService: IngredientService, private router: Router) { }

  ngOnInit(): void {
    // Charger la liste des recettes
    this.ingredientService.listeRecettes().subscribe(rects => {
      console.log('Réponse du serveur :', rects);
      if (rects && Array.isArray(rects)) {
        this.recettes = rects;
      } else if (rects?._embedded?.recettes) {
        this.recettes = rects._embedded.recettes;
      } else {
        console.error('Les recettes ne sont pas disponibles dans la réponse');
      }
    });
  }
  addIngredient() {
    this.newIngredient.recette = this.recettes.find(cat => cat.idRecette == this.newIdRec)!;
    this.ingredientService.ajouterIngredient(this.newIngredient).subscribe((prod) => {
        if (this.uploadedImage) {
            this.ingredientService.uploadImageIng(this.uploadedImage, this.uploadedImage.name, prod.idIngredient!)
                .subscribe((response: any) => {
                    console.log("Image uploadée et associée à l'ingrédient", response);
                    this.router.navigate(['ingredients']);
                }, (error) => {
                    console.error("Erreur lors du téléchargement de l'image :", error);
                });
        } else {
            this.router.navigate(['ingredients']);
        }
    });
}
/*
  addIngredient(){
    this.newIngredient.recette = this.recettes.find(rec => rec.idRecette == this.newIdRec)!;
    this.ingredientService
    .ajouterIngredient(this.newIngredient)
    .subscribe((ing) => {  this.ingredientService
    
    .uploadImageFS(this.uploadedImage, this.uploadedImage.name,ing.idIngredient)
    .subscribe((response: any) => {});
        this.router.navigate(['ingredients']);
    });
    }
    */
  onImageUpload(event: any) {

    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    
  
  }
  

  getIngredientImage(idIngredient: number) {
    this.ingredientService.getImagesForIngredient(idIngredient).subscribe((images: Image[]) => {
      if (images && images.length > 0) {
        this.imagePath = images[0].image; // Assurez-vous que l'URL de l'image est correcte
      }
    });
  }
}

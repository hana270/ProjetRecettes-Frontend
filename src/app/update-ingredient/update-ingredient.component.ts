import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recette } from '../model/recette.model';
import { Ingredient } from '../model/Ingredient.model';
import { IngredientService } from '../services/ingredient.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styles: []
})
export class UpdateIngredientComponent implements OnInit {
  currentIngredient = new Ingredient();  
  recettes: Recette[] = [];  
  updatedRecId?: number;  
  myImage!: string; 
  uploadedImage!: File; 
  isImageUpdated: Boolean = false;  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.loadRecettes();  
    this.loadIngredient(); 

  }

  loadRecettes() {
    this.ingredientService.listeRecettes().subscribe({
      next: (response) => {
        if (response && response._embedded && response._embedded.recettes) {
          this.recettes = response._embedded.recettes;
        } else {
          this.recettes = response as unknown as Recette[];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des recettes:', err);
      }
    });
  }

  loadIngredient() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.ingredientService.consulterIngredient(id).subscribe({
      next: (ingredient) => {
        this.currentIngredient = ingredient;
  
        // Charger les images associées à l'ingrédient
        this.ingredientService.getImagesForIngredient(id).subscribe({
          next: (images) => {
            this.currentIngredient.Images = images;
          },
          error: (err) => {
            console.error('Erreur lors du chargement des images associées :', err);
          }
        });
  
        if (ingredient.recette && ingredient.recette.idRecette) {
          this.updatedRecId = ingredient.recette.idRecette;
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'ingrédient :', err);
      }
    });
  }
  
  

  updateIngredient() {
    if (this.updatedRecId) {
      const recetteToUpdate = this.recettes.find(r => r.idRecette === Number(this.updatedRecId));
      
      if (recetteToUpdate) {
        this.currentIngredient.recette = recetteToUpdate;
        this.ingredientService.updateIngredient(this.currentIngredient).subscribe({
          next: () => {
            console.log('Ingrédient mis à jour avec succès');
            this.router.navigate(['ingredients']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour:', err);
          }
        });
      } else {
        console.error('Recette non trouvée pour l\'ID:', this.updatedRecId);
      }
    }
  }

  onAddImageIngredient() {
    if (!this.currentIngredient.Images) {
      this.currentIngredient.Images = [];
    }

    this.ingredientService.uploadImageIng(this.uploadedImage, this.uploadedImage.name, this.currentIngredient.idIngredient!)
      .subscribe({
        next: (img: Image) => {
          this.currentIngredient.Images.push(img);
          console.log('Image ajoutée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'image:', err);
        }
      });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
  reader.onload = () => {
  this.myImage = reader.result as string;
      };
    }
  }

  supprimerImage(img: Image) {
    if (confirm("Etes-vous sûr ?")) {
      this.ingredientService.supprimerImage(img.idImage).subscribe({
        next: () => {
          const index = this.currentIngredient.Images.indexOf(img);
          if (index > -1) {
            this.currentIngredient.Images.splice(index, 1);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'image:', err);
        }
      });
    }
  }
}

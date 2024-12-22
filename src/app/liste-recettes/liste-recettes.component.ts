import { Component, OnInit } from '@angular/core';
import { Recette } from '../model/recette.model';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-liste-recettes',
  templateUrl: './liste-recettes.component.html',
  styles: ``
})
export class ListeRecettesComponent implements OnInit{
  recettes!:Recette[];
 
  
   updatedRec!:Recette ; 
    ajout:boolean=true;
  constructor(private ingredientService: IngredientService){}
  

  ngOnInit(): void {
this.chargerRecettes();

    // Récupérer la liste des recettes
   /*  this.ingredientService.listeRecettes().subscribe(rects => {
      console.log('Réponse du serveur :', rects);
      if (rects && Array.isArray(rects)) {
          this.recettes = rects; // Assurez-vous que rects est un tableau
      } else if (rects?._embedded?.recettes) {
          this.recettes = rects._embedded.recettes;
      } else {
          console.error('Les recettes ne sont pas disponibles dans la réponse');
      }
  }); */
  
}
  chargerRecettes(){
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


    updateRec(r:Recette){
      this.updatedRec = r;
      this.ajout=false;
    }


    recetteUpdated(cat: Recette): void {
      console.log("Cat updated event", cat);
      this.ingredientService.modifierRecette(cat).subscribe(() => this.chargerRecettes());
    }
      
  
  
    supprimerRecette(cat: Recette) {
      let conf = confirm("Etes-vous sûr ?");
      if (conf) {
        this.ingredientService.supprimerRecette(cat.idRecette).subscribe(() => {
          console.log("Recette supprimée");
          this.chargerRecettes();
        });
      }
    }
    modeAjout() {
      this.updatedRec = { idRecette: 0, nomRecette: '', description: '', dateCreation: new Date() }; // Nouveau modèle pour ajout
      this.ajout = true; // Passer en mode ajout
    }


 
        
}

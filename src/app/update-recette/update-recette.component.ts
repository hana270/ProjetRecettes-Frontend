import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recette } from '../model/recette.model';
import { Ingredient } from '../model/Ingredient.model';

@Component({
  selector: 'app-update-recette',
  templateUrl: './update-recette.component.html',
  styles: ``
})
export class UpdateRecetteComponent implements OnInit {
  @Input() recette!: Recette;
  @Input() ajout: boolean = true; // Mode ajout par défaut
  @Output() recetteUpdated = new EventEmitter<Recette>();

  currentIngredient = new Ingredient();

  constructor() { }

  ngOnInit(): void {
    if (this.ajout) {
      this.recette = { idRecette: 0, nomRecette: '', description: '', dateCreation: new Date() }; // Réinitialiser pour ajout
    }
  }

  saveRecette() {
    this.recetteUpdated.emit(this.recette);
    if (this.ajout) {
      this.modeAjout(); // Réinitialiser après ajout
    }
  }

  modeAjout() {
    this.ajout = true; // Passer en mode ajout
    this.recette = { idRecette: 0, nomRecette: '', description: '', dateCreation: new Date() }; // Réinitialiser l'objet recette
  }
}

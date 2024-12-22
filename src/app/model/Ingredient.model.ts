import { Recette } from "./recette.model";
import { Image } from "./image.model";

export class Ingredient {
  idIngredient?: number;
  nomIngredient?: string;
  quantite?: number;
  uniteMesure?: string;
  recette?: Recette;
  image!: Image|null;
  imageStr!: string;
  Images!:Image[];
}

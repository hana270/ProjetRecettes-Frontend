import { Recette } from './recette.model';
export interface RecetteWrapper {
    _embedded: {
        recettes: Recette[];
    };
}

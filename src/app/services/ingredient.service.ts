import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../model/Ingredient.model';
import { Recette } from '../model/recette.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { RecetteWrapper } from '../model/recetteWrapped.model';
import { Image } from '../model/image.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  apiURLRec: string = 'http://localhost:8081/ingredients/api/cat';
  ingredients!: Ingredient[];
  //recettes : Recette[] ;
  constructor(private http: HttpClient,
    private authService: AuthService
  ) {

  }
  listeIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(apiURL + "/all");
  }

  ajouterIngredient(ing: Ingredient): Observable<Ingredient> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Ingredient>(apiURL + "/adding", ing, { headers: httpHeaders });
  }

  /*
    supprimerIngredient(id: number) {
  
      const url = `${apiURL}/deling/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.delete(url, { headers: httpHeaders });
    }
  */


  consulterIngredient(id: number): Observable<Ingredient> {
      const url = `${apiURL}/getbyid/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Ingredient>(url, { headers: httpHeaders });
  }
 
  trierIngredients() {
    this.ingredients = this.ingredients.sort((n1, n2) => {
      if (n1.idIngredient! > n2.idIngredient!) { 
        return 1; } 
        if (n1.idIngredient! < n2.idIngredient!) { 
          return -1; 
        } 
          return 0;
    });
  }



  updateIngredient(ing: Ingredient) {
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Ingredient>(apiURL + "/updateing", ing, { headers: httpHeaders });
  }


  listeRecettes(): Observable<RecetteWrapper> {
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<RecetteWrapper>(this.apiURLRec, { headers: httpHeaders }
    );

  }

  rechercherParRecette(idRecette: number): Observable<Ingredient[]> {
    const url = `${apiURL}/ingcrect/${idRecette}`;
    return this.http.get<Ingredient[]>(url);
  }

  rechercherParNom(nom: string): Observable<Ingredient[]> {
    const url = `${apiURL}/ingsByName/${nom}`;
    return this.http.get<Ingredient[]>(url);
  }

  ajouterRecette(cat: Recette): Observable<Recette> {
    return this.http.post<Recette>(this.apiURLRec, cat, httpOptions);
  }

  supprimerRecette(id: number): Observable<void> {
    const url = `${this.apiURLRec}/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  modifierRecette(cat: Recette): Observable<Recette> {
    const url = `${this.apiURLRec}/${cat.idRecette}`;
    return this.http.put<Recette>(url, cat, httpOptions);
  }



  uploadImage(file: File, filename: string): Observable<Image> {

      const imageFormData = new FormData(); imageFormData.append('image', file, filename); 
      const url = `${apiURL+ '/image/upload'}`; 
    return this.http.post<Image>(url, imageFormData);
   } 

    loadImage(id: number): Observable<Image> { 
      
      const url = `${apiURL + '/image/get/info'}/${id}`; 
      return this.http.get<Image>(url); 
  }
    
    
    /*

  uploadImageIng(file: File, filename: string, idIng: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL}/image/uplaodImageIng/${idIng}`;
    return this.http.post(url, imageFormData);
}

  
  supprimerImage(id : number) {
    const url = `${apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
    }
    */

  

uploadImageIng(file: File, filename: string, idIng: number): Observable<Image> {
  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${apiURL}/image/uplaodImageIng/${idIng}`; // Match the backend spelling
  
  return this.http.post<Image>(url, imageFormData);
}


  supprimerIngredient(id: number) {

    const url = `${apiURL}/deling/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  supprimerImage(id: number) {
    const url = `${apiURL}/image/delete/${id}`; return this.http.delete(url, httpOptions);
  }

  uploadImageFS(file: File, filename: string, idProd: number):
    Observable<any> {
      const imageFormData = new FormData(); imageFormData.append
        ('image', file, filename); const url = `${apiURL + '/image/uploadFS'}/${idProd}`
      ; return this.http.post(url, imageFormData);
  }

  getImagesForIngredient(idIng: number): Observable<Image[]> {
    const url = `${apiURL}/image/getImagesIng/${idIng}`;
    return this.http.get<Image[]>(url);
  }

  
/****
 * 
 *
 *  uploadImageFS(file: File, filename: string, idIng : number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uploadFS'}/${idIng}`;
      return this.http.post(url, imageFormData);
}

 * 
 * 
 * ***** */

}
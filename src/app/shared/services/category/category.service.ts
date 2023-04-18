import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import {
  CategoryRequest,
} from '../../interfaces/category.interface';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  updateDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.BACKEND_URL;
  private api = { category: `${this.url}/categorys` };

  constructor(
      private http: HttpClient,
      private afs:Firestore,
  ) {}

  // getAll(): Observable<CategoryResponse[]> {
  //   return this.http.get<CategoryResponse[]>(this.api.category);
  // }
  // create(action: CategoryRequest): Observable<CategoryResponse> {
  //   return this.http.post<CategoryResponse>(this.api.category, action);
  // }
  // update(action: CategoryRequest, id: number): Observable<CategoryResponse> {
  //   return this.http.patch<CategoryResponse>(
  //     `${this.api.category}/${id}`,
  //     action
  //   );
  // }
  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.category}/${id}`);
  // }
  /////////////-----------------------------------
  getAllFirebase() {
    return getDocs( collection(this.afs, 'categories') )
  }
  createFirebase(category: CategoryRequest) {
    return addDoc( collection(this.afs, 'categories'), category )
  }

  updateFirebase(category: CategoryRequest, id: string) {
    return updateDoc( doc(this.afs, `categories/${id}`), {...category} )
  }

  deleteFirebase(id: string){
    return deleteDoc( doc(this.afs, `categories/${id}`) );
  }

}

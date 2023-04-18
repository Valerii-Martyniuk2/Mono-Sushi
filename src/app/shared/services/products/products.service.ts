import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductRequest } from '../../interfaces/product.interface';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient, private afs: Firestore) {}
  getAllFireBase() {
    return getDocs(collection(this.afs, "products"));
  }

  getAllByCategoryFirebase(name: string) {
    return getDocs(
      query(
        collection(this.afs, "products"),
        where("category", "==", `${name}`)
      )
    );
  }
  getOneFirebase(id: string) {
    return docData(doc(this.afs, `products/${id}`), { idField: "id" });
  }

  createFirebase(product: ProductRequest) {
    return addDoc(collection(this.afs, "products"), product);
  }

  updateFirebase(product: ProductRequest, id: string) {
    return updateDoc(doc(this.afs, `products/${id}`), { ...product });
  }

  deleteFirebase(id: string) {
    return deleteDoc(doc(this.afs, `products/${id}`));
  }
}

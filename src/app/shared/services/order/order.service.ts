import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { ActionRequest } from '../../interfaces/action.interface';

@Injectable({
  providedIn: "root",
})
export class OrderService {
  public changeBasket$ = new Subject<boolean>();
  public changeUser = new Subject<boolean>();
  public basketClose$ = new Subject<boolean>();
  constructor(private afs: Firestore) {}

  createOrderFirebase(order: any) {
    return addDoc(collection(this.afs, "orders"), order);
  }

  getAllOrdersFirebase() {
    return getDocs(collection(this.afs, "orders"));
  }

  getAllByUserIdFirebase(id: string) {
    return getDocs(
      query(collection(this.afs, "orders"), where("id", "==", `${id}`))
    );
  }
  updateOrderFirebase(order: ActionRequest, id: string) {
    return updateDoc(doc(this.afs, `orders/${id}`), { ...order });
  }
}

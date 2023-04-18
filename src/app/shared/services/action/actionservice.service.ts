import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionRequest } from '../../interfaces/action.interface';
import { addDoc, collection, deleteDoc, doc, docData, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ActionserviceService {
 constructor(
      private http: HttpClient,
      private afs: Firestore,
  ) {}

  getAllFirebase() {
    return getDocs( collection(this.afs, 'actions') )
  }
  getOneFirebase(id: string) {
    return docData( doc(this.afs, `actions/${id}`), {idField: 'id'} )
  }

  createFirebase(action: ActionRequest) {
    return addDoc( collection(this.afs, 'actions'), action )
  }

  updateFirebase(action: ActionRequest, id: string) {
    return updateDoc( doc(this.afs, `actions/${id}`), {...action} )
  }
  deleteFirebase(id: string) {
    return deleteDoc( doc(this.afs, `actions/${id}`) );
  }
}

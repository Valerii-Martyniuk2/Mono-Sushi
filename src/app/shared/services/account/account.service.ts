import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { UserData } from '../../interfaces/account.interface';

@Injectable({
  providedIn: "root",
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();
  public isUserLoginInfo$ = new Subject<boolean>();
  public map!: any;

  constructor(private http: HttpClient, private afs: Firestore) {}

  updateUserFirebase(userInfo: UserData, id: string) {
    return updateDoc(doc(this.afs, `users/${id}`), { ...userInfo });
  }
}

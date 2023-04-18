import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/services/account/account.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-personaldata",
  templateUrl: "./personaldata.component.html",
  styleUrls: ["./personaldata.component.scss"],
})
export class PersonaldataComponent implements OnInit, OnDestroy {
  public userForm!: FormGroup;
  public user!: any;
  public userInfoSubscription!: Subscription | null;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.userInfoSubscription = this.accountService.isUserLoginInfo$.subscribe(
      () => {
        this.takeUserInfo();
        console.log("user info updated");
      }
    );
  }

  ngOnInit(): void {
    this.initUserForm();
    this.takeUserInfo();
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
      this.userInfoSubscription = null;
    }
  }
  initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

  takeUserInfo(): void {
    if (localStorage.length > 0 && localStorage.getItem("currentUser")) {
      this.user = JSON.parse(localStorage.getItem("currentUser") as string);
      this.userForm.patchValue({
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
      });
    }
  }
  logOut(): void {
    localStorage.removeItem("currentUser");
    this.accountService.isUserLogin$.next(true);
    this.router.navigate([""]);
    this.orderService.changeBasket$.next(true);
  }

  updateUserInfo():void{
    const user = {
        addres:this.user.addres,
        email: this.userForm.get('email')?.value,
        firstName: this.userForm.get('firstName')?.value,
        lastName:this.userForm.get('lastName')?.value,
        orders:this.user.orders,
        phoneNumber:this.userForm.get('phoneNumber')?.value,
        role:this.user.role,
    }
    this.accountService.updateUserFirebase(user,this.user.uid)

    this.user.email = this.userForm.get('email')?.value
    this.user.firstName = this.userForm.get('firstName')?.value
    this.user.lastName = this.userForm.get('lastName')?.value
    this.user.phoneNumber = this.userForm.get('phoneNumber')?.value

    localStorage.setItem("currentUser", JSON.stringify(this.user))
    this.accountService.isUserLoginInfo$.next(true)
    this.accountService.isUserLogin$.next(true)
  }
}

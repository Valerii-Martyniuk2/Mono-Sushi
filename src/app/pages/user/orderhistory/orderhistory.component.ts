import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AccountService } from '../../../shared/services/account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss']
})
export class OrderhistoryComponent implements OnInit, OnDestroy{
  public orders!: any;
  public products: any = [];
  public user!: any;
  public userInfoSubscription!: Subscription | null;

  constructor(
      private orderService: OrderService,
      private accountService:AccountService
  ) {
    this.userInfoSubscription =  this.accountService.isUserLoginInfo$.subscribe( () => {
      this.takeUserInfo()
      console.log('user info updated')
    })
  }

  ngOnInit() {
    this.takeUserInfo()
    this.loadOrders()
  }

  ngOnDestroy() {
    if(this.userInfoSubscription){
      this.userInfoSubscription.unsubscribe();
      this.userInfoSubscription = null;
    }
  }

  async loadOrders() {
    this.orders = [];
    const actions = await this.orderService.getAllByUserIdFirebase(this.user.uid);
    let n = 0;
    if(actions) {
      actions.forEach((doc: any) => {
        this.orders.push(doc.data());
        this.orders[n].docId = doc.id;
        if (this.orders[n].basketProducts) {
          let arr = JSON.parse(this.orders[n].basketProducts)
          this.orders[n].basketProducts = arr
          this.products.push(arr)
        }
        n++;
      });
    }
  }

  takeUserInfo(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }

}

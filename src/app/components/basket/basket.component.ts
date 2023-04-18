import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductResponse } from '../../shared/interfaces/product.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { OrderService } from '../../shared/services/order/order.service';
import { AccountService } from '../../shared/services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthUserComponent } from '../auth-user/auth-user.component';

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"],
})
export class BasketComponent implements OnInit, OnDestroy {
  public userData = {
    name: "s",
    id: "",
    isLogin: false,
  };

  public basket: Array<ProductResponse> = [];
  public basketInfo = {
    total: 0,
    count: 0,
  };
  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updateBasket();
    this.loadBasket();
    this.initUser();
    this.updateUser();
  }
  ngOnDestroy(): void {
    this.orderService.basketClose$.next(true);
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem("basket")) {
      this.basket = JSON.parse(localStorage.getItem("basket") as string);
      this.getBasketInfo();
    } else {
      this.basket = [];
      this.basketInfo.total = 0;
      this.basketInfo.count = 0;
    }
  }
  getBasketInfo(): void {
    this.basketInfo.total = this.basket.reduce(
      (total: number, prod: ProductResponse) =>
        total + prod.count * Number(prod.price),
      0
    );
    this.basketInfo.count = this.basket.length;
  }

  updateBasket(): void {
    this.orderService.changeBasket$.subscribe(() => {
      this.loadBasket();
    });
  }

  //////-----

  countProduct(product: ProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    }
    if (!value && product.count > 1) {
      --product.count;
    }
    localStorage.setItem("basket", JSON.stringify(this.basket));
    this.orderService.changeBasket$.next(true);
  }

  deletBasketProduct(product: ProductResponse): void {
    let index = this.basket.findIndex((item) => item.id === product.id);
    this.basket.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(this.basket));
    this.orderService.changeBasket$.next(true);
  }
  initUser(): void {
    if (localStorage.length > 0 && localStorage.getItem("currentUser")) {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") as string
      );
      this.userData.isLogin = true;
      this.userData.id = currentUser.uid;
      this.userData.name = currentUser.firstName;
    } else {
      this.userData.name = "";
      this.userData.id = "";
      this.userData.isLogin = false;
    }
  }
  updateUser(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.initUser();
    });
  }
  // ////////LOGIN////////
  openLogin(): void {
    this.dialog.open(AuthUserComponent, {
      backdropClass: "dialog-back",
      panelClass: "auth-dialog",
      autoFocus: false,
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

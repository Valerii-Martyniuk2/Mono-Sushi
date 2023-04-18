import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CategoryService } from "src/app/shared/services/category/category.service";
import { CategoryResponse } from "src/app/shared/interfaces/category.interface";
import { ProductResponse } from "src/app/shared/interfaces/product.interface";
import { Subscription } from "rxjs";
import { OrderService } from "src/app/shared/services/order/order.service";
import { AccountService } from "src/app/shared/services/account/account.service";
import { NavigationEnd, Router } from "@angular/router";

///////LOGIN AND CREATE/////
import { MatDialog } from "@angular/material/dialog";
import { AuthUserComponent } from "../auth-user/auth-user.component";
import { CallBackComponent } from "../call-back/call-back.component";
import { BasketComponent } from "../basket/basket.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userData = {
    name: "s",
    id: "",
    isLogin: false,
  };

  public isUserItems: boolean = false;
  public scrollTopSubscription!: Subscription;
  public basketBackSubscription!: Subscription;
  public phoneMenuWidth = 0;
  public isphoneMenuWidh = false;
  public isNavItems: boolean = false;
  public Categories: Array<CategoryResponse> = [];
  public basket: Array<ProductResponse> = [];
  public basketInfo = {
    total: 0,
    count: 0,
  };
  public mouseFirstPosition!: number;
  public slidePosition!: number;
  public canMove = false;

  @ViewChild("bascetBackground") bascetBackground: any;
  @ViewChild("phoneMenu") phoneMenu: any;
  @ViewChild("menuRotate2") menuRotate2: any;
  @ViewChild("arrow") arrow: any;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.scrollTopSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scroll({
          top: 0,
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
    this.initUser();
    this.updateUser();
    this.updateBasketBackground();
  }
  ngOnDestroy(): void {
    if (this.scrollTopSubscription) {
      this.scrollTopSubscription.unsubscribe();
    }
    if (this.basketBackSubscription) {
      this.basketBackSubscription.unsubscribe();
    }
  }

  async loadCategories() {
    this.Categories = [];
    const categories = await this.categoryService.getAllFirebase();
    categories.forEach((doc: any) => {
      this.Categories.push(doc.data());
    });
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

  // /////////////////// LOGIN DATA //////////////
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
  updateBasketBackground(): void {
    this.basketBackSubscription = this.orderService.basketClose$.subscribe(
      () => {
        this.bascetBackground.nativeElement.classList.remove("height10");
      }
    );
  }
  // ////////LOGIN////////
  openLogin(): void {
    if (this.dialog.getDialogById("logindilog")) {
      this.dialog.closeAll();
    } else {
      this.dialog.open(AuthUserComponent, {
        id: "logindilog",
        backdropClass: "dialog-back",
        panelClass: "auth-dialog",
        autoFocus: false,
      });
    }
  }
  openBasket(): void {
    this.bascetBackground.nativeElement.classList.add("height10");
    if (this.dialog.getDialogById("dddidrk")) {
      this.dialog.closeAll();
    } else {
      this.dialog.open(BasketComponent, {
        id: "dddidrk",
        backdropClass: "dialog-backBasket",
        panelClass: "auth-dialogBasket",
        autoFocus: false,
      });
    }
  }
  openCallBack(): void {
    if (this.dialog.getDialogById("dddcallBack")) {
      this.dialog.closeAll();
    } else {
      this.dialog.open(CallBackComponent, {
        id: "dddcallBack",
        backdropClass: "dialog-back",
        panelClass: "auth-dialog",
        autoFocus: false,
      });
    }
  }
  logOut(): void {
    localStorage.removeItem("currentUser");
    this.userData.isLogin = false;
    this.accountService.isUserLogin$.next(true);
    this.router.navigate([""]);
    this.orderService.changeBasket$.next(true);
  }

  ///////PHONE MENU

  openMenuPhone(): void {
    if (this.phoneMenuWidth === 0) {
      this.phoneMenuWidth = 50;
      this.isphoneMenuWidh = true;
    } else {
      this.phoneMenuWidth = 0;
      this.isphoneMenuWidh = false;
      this.dialog.closeAll();
    }
  }
  noDialog(): void {
    this.dialog.closeAll();
  }
  ///////////////////ROTATE MENU//////////////
  rotateMenu(element: HTMLElement): any {
    if (element.children[0].classList.contains("line1-rotate1")) {
      this.arrow.nativeElement.classList.remove("rotate-dag");
      element.children[0].classList.remove("line1-rotate1");
      element.children[0].classList.add("line1-rotate1m");
      element.children[2].classList.remove("line3-rotate3");
      element.children[2].classList.add("line3-rotate3m");
      setTimeout(
        () => element.children[1].classList.remove("line2-d-none"),
        300
      );
    } else {
      this.arrow.nativeElement.classList.add("rotate-dag");
      element.children[0].classList.remove("line1-rotate1m");
      element.children[0].classList.add("line1-rotate1");
      element.children[2].classList.remove("line3-rotate3m");
      element.children[2].classList.add("line3-rotate3");
      element.children[1].classList.add("line2-d-none");
    }
  }
  //////////////////SLIDER///////////////////

  @HostListener("document:touchmove", ["$event"])
  onTouchMove(e: any) {
    if (this.canMove) {
      if (e.touches[0].clientX < this.slidePosition) {
        this.phoneMenuWidth += e.touches[0].clientX / window.innerWidth;
      } else {
        this.phoneMenuWidth -= e.touches[0].clientX / window.innerWidth;
      }
    }
    this.slidePosition = e.touches[0].clientX;
  }

  onMouseUp(e: any) {
    if (this.canMove) {
      this.canMove = false;
      this.phoneMenu.nativeElement.classList.remove("transformation-dutation");
      if (this.mouseFirstPosition > this.slidePosition ) {
        this.mySlidePosition(true);
      } else {
        this.mySlidePosition(false);
      }
    }
  }

  mySlidePosition(bool: boolean): void {
    if (bool) {
      this.phoneMenuWidth = 50;
      this.isphoneMenuWidh = true;
      this.arrow.nativeElement.classList.add("rotate-dag");
      this.menuRotate2.nativeElement.children[0].classList.remove(
        "line1-rotate1m"
      );
      this.menuRotate2.nativeElement.children[0].classList.add("line1-rotate1");
      this.menuRotate2.nativeElement.children[2].classList.remove(
        "line3-rotate3m"
      );
      this.menuRotate2.nativeElement.children[2].classList.add("line3-rotate3");
      this.menuRotate2.nativeElement.children[1].classList.add("line2-d-none");
    } else {
      this.phoneMenuWidth = 0;
      this.isphoneMenuWidh = false;
      this.dialog.closeAll();
      this.arrow.nativeElement.classList.remove("rotate-dag");
      this.menuRotate2.nativeElement.children[0].classList.remove(
        "line1-rotate1"
      );
      this.menuRotate2.nativeElement.children[0].classList.add(
        "line1-rotate1m"
      );
      this.menuRotate2.nativeElement.children[2].classList.remove(
        "line3-rotate3"
      );
      this.menuRotate2.nativeElement.children[2].classList.add(
        "line3-rotate3m"
      );
      setTimeout(
        () =>
          this.menuRotate2.nativeElement.children[1].classList.remove(
            "line2-d-none"
          ),
        300
      );
    }
  }

  touchstartMy(event: any): void {
    this.phoneMenu.nativeElement.classList.add("transformation-dutation");
    this.mouseFirstPosition = event.touches[0].clientX;
    this.slidePosition = event.touches[0].clientX;
    this.canMove = true;
  }
}

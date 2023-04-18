import {Component, HostListener, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionResponse } from "src/app/shared/interfaces/action.interface";
import { ProductResponse } from "src/app/shared/interfaces/product.interface";
import { ActionserviceService } from "src/app/shared/services/action/actionservice.service";
import { OrderService } from "src/app/shared/services/order/order.service";
import { ProductsService } from "src/app/shared/services/products/products.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  public adminProducts: Array<ProductResponse> = [];
  public allActions!: Array<ActionResponse>;
  public radioCount = 0;
  public slidesCount = 0;
  public isCountDisplay!: boolean;
  public maxPosition = 0;
  public countRadio = [0];
  public interval!: any;
  public sliderPosition = 0;

  @ViewChild("sliderLine") sliderLine: any;

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    //////slider listener
    this.loadInterval();
  }

  constructor(
    private productsService: ProductsService,
    private actionService: ActionserviceService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadActions();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async loadProducts() {
    this.adminProducts = [];
    const products = await this.productsService.getAllByCategoryFirebase(
      "rolls"
    );
    let n = 0;
    await products.forEach((doc: any) => {
      this.adminProducts.push(doc.data());
      this.adminProducts[n].id = doc.id;
      n++;
    });
    const products2 = await this.productsService.getAllByCategoryFirebase(
      "sets"
    );
    await products2.forEach((doc: any) => {
      this.adminProducts.push(doc.data());
      this.adminProducts[n].id = doc.id;
      n++;
    });
  }

  async loadActions() {
    this.allActions = [];
    const actions = await this.actionService.getAllFirebase();
    let n = 0;
    await actions.forEach((doc: any) => {
      this.allActions.push(doc.data());
      this.allActions[n].id = doc.id;
      n++;
    });
    this.loadInterval();
  }

  countProduct(product: ProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addBasket(prod: ProductResponse): void {
    let basket: Array<ProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem("basket")) {
      basket = JSON.parse(localStorage.getItem("basket") as string);

      if (basket.some((item) => item.id === prod.id)) {
        const index = basket.findIndex((item) => item.id === prod.id);
        basket[index].count += prod.count;
      } else {
        basket.push(prod);
      }
    } else {
      basket.push(prod);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    prod.count = 1;
    this.orderService.changeBasket$.next(true);
  }

  ////////////////////SLIDER//////////////

  loadInterval(): void {
    this.maxPosition = 0;
    this.sliderPosition = 0;
    this.countRadio = [0];
    if (window.innerWidth > 1000) {
      for (let i = 0; i < this.allActions.length - 2; i++) {
        this.maxPosition -= (window.innerWidth - 20 - 40) / 2 + 20;
        this.countRadio.push(this.maxPosition);
      }
      for (let i = 0; i < this.slidesCount; i++) {
        this.sliderPosition -= (window.innerWidth - 20 - 40) / 2 + 20;
      }
      this.isCountDisplay = false;
    } else if (window.innerWidth <= 1000) {
      for (let i = 0; i < this.allActions.length - 1; i++) {
        this.maxPosition -= window.innerWidth / 1.1;
        this.countRadio.push(this.maxPosition);
      }
      for (let i = 0; i < this.slidesCount; i++) {
        this.sliderPosition -= window.innerWidth / 1.1;
      }
      this.isCountDisplay = true;
    }
    if (this.sliderPosition < this.maxPosition) {
      this.sliderPosition = 0;
      this.radioCount = 0;
      this.slidesCount = 0;
      console.log(this.slidesCount);
    }
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.sliderInterval();
      }, 10000);
    }
  }

  sliderInterval(): void {
    if (
      this.sliderPosition === this.maxPosition ||
      this.sliderPosition < this.maxPosition
    ) {
      this.sliderPosition = 0;
      this.radioCount = 0;
      this.slidesCount = 0;
    } else {
      if (window.innerWidth > 1000) {
        this.sliderPosition -= (window.innerWidth - 20 - 40) / 2 + 20;
      }
      if (window.innerWidth <= 1000) {
        this.sliderPosition -= window.innerWidth / 1.1;
      }
      this.radioCount += 1;
      this.slidesCount += 1;
    }
  }

  myPosition(position: number, i: number): void {
    this.sliderPosition = position;
    this.radioCount = i;
    this.slidesCount = i;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.sliderInterval();
    }, 10000);
  }
}

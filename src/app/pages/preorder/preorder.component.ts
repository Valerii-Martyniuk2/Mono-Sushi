import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AfterOrderComponent } from 'src/app/components/after-order/after-order.component';
import { AuthUserComponent } from 'src/app/components/auth-user/auth-user.component';
import { ProductResponse } from 'src/app/shared/interfaces/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: "app-preorder",
  templateUrl: "./preorder.component.html",
  styleUrls: ["./preorder.component.scss"],
})
export class PreorderComponent implements OnInit, AfterViewInit {
  address = "";
  isAddress = true;
  map: any;
  autcomp: any;
  myLatlng: any;
  // declare google: any;

  isDeliveryZone = [true];
  addressZone = ["string"];
  deliveryCost = [20];

  public userData = {
    name: "s",
    id: "",
    isLogin: false,
  };
  public basketData = {
    date: String(new Date()),
    info: "s",
    total: "s",
    basketProducts: "s",
    id: "s",
    address: "",
  };

 public isBasket: boolean = false;
  public basket: Array<ProductResponse> = [];
  public basketInfo = {
    total: 0,
    count: 0,
  };


  @ViewChild("mapElement") mapElement: any;
  @ViewChild("autocomplete") autocomplete: any;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
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
  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: { lat: 49.840136854206456, lng: 24.028882645737728 },
      // mapTypeId: "terrain",
    });

    // Define the LatLng coordinates for the polygon's path.
    const greenZone = [
      { lat: 49.83720539836569, lng: 23.99473653447145 },
      { lat: 49.85645293336773, lng: 24.020981190097615 },
      { lat: 49.87085732958939, lng: 24.022701266311124 },
      { lat: 49.859254132364406, lng: 24.04794667074571 },
      { lat: 49.84219416912296, lng: 24.037958905765052 },
      { lat: 49.83720539836569, lng: 23.99473653447145 },
    ];
    const yellowZone = [
      { lat: 49.83720539836569, lng: 23.99473653447145 },
      { lat: 49.84219416912296, lng: 24.037958905765052 },
      { lat: 49.859254132364406, lng: 24.04794667074571 },
      { lat: 49.85121140751676, lng: 24.063714650226018 },
      { lat: 49.84181495178121, lng: 24.068072049206762 },
      { lat: 49.83102174520574, lng: 24.049366364334116 },
      { lat: 49.826961792549554, lng: 24.01077298300003 },
      { lat: 49.83720539836569, lng: 23.99473653447145 },
    ];
    // Construct the polygon.
    const greenPolygon = new google.maps.Polygon({
      paths: greenZone,
      strokeColor: "#008000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#32CD32",
      fillOpacity: 0.35,
    });
    const yellowPolygon = new google.maps.Polygon({
      paths: yellowZone,
      strokeColor: "#FFFF00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FFFF66",
      fillOpacity: 0.35,
    });

    greenPolygon.setMap(this.map);
    yellowPolygon.setMap(this.map);
    ////////AUTOCOMPLETE
    const centerPlace = { lat: 49.840136854206456, lng: 24.028882645737728 };
    // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
      north: centerPlace.lat + 0.1,
      south: centerPlace.lat - 0.1,
      east: centerPlace.lng + 0.1,
      west: centerPlace.lng - 0.1,
    };
    const input = this.autocomplete.nativeElement;
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: ["ua", "us"] },
      fields: ["address_components", "geometry"],
      strictBounds: false,
      types: ["address"],
    };
    this.autcomp = new google.maps.places.Autocomplete(input, options);
    let p = this.autcomp;
    let m = this.map;
    let l = this.myLatlng;
    let zone = this.addressZone;
    let deliveryzone = this.isDeliveryZone;
    let cost = this.deliveryCost;
    let marker: any;

    google.maps.event.addListener(this.autcomp, "place_changed", function () {
      let place = p.getPlace();
      let lat = place.geometry.location.lat();
      let lon = place.geometry.location.lng();
      l = new google.maps.LatLng(lat, lon);
      m.panTo(l);
      marker = new google.maps.Marker({
        position: l,
        map: m,
        title: "Hello Piter!",
      });

      if (google.maps.geometry.poly.containsLocation(l, yellowPolygon)) {
        zone[0] = "yellow";
        cost[0] = 25;
        deliveryzone[0] = true;
      } else if (google.maps.geometry.poly.containsLocation(l, greenPolygon)) {
        zone[0] = "green";
        cost[0] = 20;
        deliveryzone[0] = true;
      } else if (
        !google.maps.geometry.poly.containsLocation(l, greenPolygon) &&
        !google.maps.geometry.poly.containsLocation(l, yellowPolygon)
      ) {
        deliveryzone[0] = false;
      }
      ////////////GEOCODER/////////

      //////////////////////
    });
  }

  /////////////////////////////BASKER***************************

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

  makeOrder(): any {
    if (this.address === "") {
      return (this.isAddress = false);
    }
    this.initUser();
    this.basketData.date = String(new Date());
    this.basketData.total = String(
      this.basketInfo.total + this.deliveryCost[0]
    );
    this.basketData.info = "processed";
    this.basketData.address = this.autocomplete.nativeElement.value;
    this.basketData.basketProducts = JSON.stringify(this.basket);
    this.basketData.id = this.userData.id;
    if (Number(this.basketData.total) > 0) {
      this.orderService.createOrderFirebase(this.basketData);
      localStorage.removeItem("basket");
      this.orderService.changeBasket$.next(true);
      this.isBasket = !this.isBasket;
      this.basketData.address = "";
      this.dialog.closeAll();
      this.router.navigate([""]);
      this.dialog.open(AfterOrderComponent, {
        backdropClass: "dialog-back",
        panelClass: "auth-dialog",
        autoFocus: false,
      });
    }
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

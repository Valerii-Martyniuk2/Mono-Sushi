import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: "app-admin-orders",
  templateUrl: "./admin-orders.component.html",
  styleUrls: ["./admin-orders.component.scss"],
})
export class AdminOrdersComponent implements OnInit {
  public orders!: any;
  public products: any = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders() {
    this.orders = [];
    const actions = await this.orderService.getAllOrdersFirebase();
    let n = 0;
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

  markDone(order:any): void {
    order.info = 'Done'
    let stringArr = JSON.stringify(order.basketProducts)
    order.basketProducts = stringArr
    this.orderService.updateOrderFirebase(order, order.docId)
    this.loadOrders()
  }
}

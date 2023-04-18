import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-after-order",
  templateUrl: "./after-order.component.html",
  styleUrls: ["./after-order.component.scss"],
})
export class AfterOrderComponent {
  constructor(public dialog: MatDialog) {}

  closedialog(): void {
    this.dialog.closeAll();
  }
}

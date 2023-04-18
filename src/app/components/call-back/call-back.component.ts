import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AfterOrderComponent } from '../after-order/after-order.component';

@Component({
  selector: "app-call-back",
  templateUrl: "./call-back.component.html",
  styleUrls: ["./call-back.component.scss"],
})
export class CallBackComponent implements OnInit {
  public callBackForm!: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.buildCallBackForm();
  }

  buildCallBackForm(): void {
    this.callBackForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  closeComponent(): void {
    this.dialog.closeAll();
  }

  callBackReload(): void {
    this.callBackForm.reset();
    this.closeComponent();
    this.dialog.open(AfterOrderComponent, {
      backdropClass: "dialog-back",
      panelClass: "auth-dialog",
      autoFocus: false,
    });
  }
}

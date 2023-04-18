import { NgModule } from "@angular/core";

import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";

const MATERIAL = [MatDialogModule, MatInputModule, MatSidenavModule];

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [],
  imports: [...MATERIAL, FormsModule, ReactiveFormsModule],
  exports: [...MATERIAL, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

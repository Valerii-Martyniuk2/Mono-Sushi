import { Component } from '@angular/core';

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
  maxHeight2(event: any) {
    event.classList.toggle("maxHeight");
    event.classList.toggle("focusColor");
    event.children[0].children[0].classList.toggle("rotate");
  }
}

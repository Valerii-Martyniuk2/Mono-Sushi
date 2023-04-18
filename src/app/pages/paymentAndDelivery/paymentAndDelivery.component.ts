import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: "app-paymentAndDelivery",
  templateUrl: "./paymentAndDelivery.component.html",
  styleUrls: ["./paymentAndDelivery.component.scss"],
})
export class PaymentAndDeliveryComponent implements OnInit, AfterViewInit {
  map: any;
  autcomp: any;
  myLatlng: any;
  // declare google: any;

  @ViewChild("mapElement") mapElement: any;
  @ViewChild("autocomplete") autocomplete: any;

  constructor() {}
  ngOnInit() {}
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
    google.maps.event.addListener(this.autcomp, "place_changed", function () {
      let place = p.getPlace();
      let lat = place.geometry.location.lat();
      let lon = place.geometry.location.lng();
      l = new google.maps.LatLng(lat, lon);
      m.panTo(l);
      let marker = new google.maps.Marker({
        position: l,
        map: m,
        title: "Hello Piter!",
      });
      console.log(google.maps.geometry.poly.containsLocation(l, yellowPolygon));
      console.log(google.maps.geometry.poly.containsLocation(l, greenPolygon));
    });
  }

}

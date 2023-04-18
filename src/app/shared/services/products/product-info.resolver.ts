import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Data,
} from '@angular/router';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoResolver implements Data {
  constructor(private productsService: ProductsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Data {
    return this.productsService.getOneFirebase( String(route.paramMap.get('id')) );
  }
}

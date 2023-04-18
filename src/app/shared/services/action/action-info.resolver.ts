import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, } from '@angular/router';
import { ActionserviceService } from './actionservice.service';

@Injectable({
  providedIn: 'root',
})
export class ActionInfoResolver implements Data {
  constructor(private actionService: ActionserviceService) {}
  resolve(route: ActivatedRouteSnapshot): Data {
    return this.actionService.getOneFirebase( String(route.paramMap.get('id') ));
  }
}

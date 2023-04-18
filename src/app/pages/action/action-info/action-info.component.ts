import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionResponse } from 'src/app/shared/interfaces/action.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss'],
})
export class ActionInfoComponent implements OnInit, OnDestroy {
  public action : ActionResponse = {
    date: 'st',
    name: 'st',
    title: 'st',
    description: 'st',
    imagePath: 'st',
    id:'st',
  }
  public subscribeAction!: Subscription
  public description: Array<string>=['q','q']

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.subscribeAction = this.activatedRoute.data.subscribe((response) => {
      this.action = response['actionInfo'];
    });
    if(this.action) {
      this.description = this.action.description.split('<br>');
    }
  }

  ngOnDestroy() {
    if(this.subscribeAction) {
      this.subscribeAction.unsubscribe()
    }
  }
}

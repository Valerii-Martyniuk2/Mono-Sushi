import { Component, OnInit } from '@angular/core';
import { ActionResponse } from 'src/app/shared/interfaces/action.interface';
import { ActionserviceService } from 'src/app/shared/services/action/actionservice.service';
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  public allActions!: Array<ActionResponse>;

  constructor(private actionService: ActionserviceService) {}
  ngOnInit(): void {
    this.loadAction();
  }
  async loadAction() {
    this.allActions = [];
    const actions = await this.actionService.getAllFirebase();
    let n = 0;
    actions.forEach((doc: any) => {
      this.allActions.push(doc.data())
      this.allActions[n].id = doc.id
      n++ ;
    })
  }
}

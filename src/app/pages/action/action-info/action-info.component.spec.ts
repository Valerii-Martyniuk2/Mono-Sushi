import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInfoComponent } from './action-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActionInfoComponent', () => {
  let component: ActionInfoComponent;
  let fixture: ComponentFixture<ActionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionInfoComponent ],
      imports:[
          ReactiveFormsModule,
          RouterTestingModule,
          FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

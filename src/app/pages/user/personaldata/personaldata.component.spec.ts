import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaldataComponent } from './personaldata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('PersonaldataComponent', () => {
  let component: PersonaldataComponent;
  let fixture: ComponentFixture<PersonaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaldataComponent ],
      imports:[
          FormsModule,
          RouterTestingModule,
          ReactiveFormsModule
      ],

     })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

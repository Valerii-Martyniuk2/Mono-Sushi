import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionComponent } from './action.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionComponent ],
      imports:[
          HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

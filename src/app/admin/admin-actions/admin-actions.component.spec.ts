import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsComponent } from './admin-actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('ActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActionsComponent ],
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { provide: Storage, useValue:{} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should edit action', () => {
  //   const action = {
  //     id: 1,
  //     datdat: 'string',
  //     name: 'qqq',
  //     title: 'string',
  //     description: 'string',
  //     imagePath: 'string',
  //   }
  //   spyOn( component, "editAction" ).and.callThrough();
  //   component.editAction( action );
  //   expect(component.editAction).toHaveBeenCalled();
  //   expect( component.currentActionId).toBe(1);
  //   expect( component.textAction).toBe( false );
  //   expect( component.isUploaded).toBe( true );
  //   expect( component.editStatus).toBe( true );
  // });

  it('should addAction', () => {
    spyOn( component, "addAction" ).and.callThrough();
    component.addAction();
    expect(component.addAction).toHaveBeenCalled();
    expect( component.textAction).toBe( true );
  });

});

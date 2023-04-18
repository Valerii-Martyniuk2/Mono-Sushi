import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Storage} from "@angular/fire/storage";
import {Validators} from "@angular/forms";

describe('CategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { provide: Storage , useValue:{}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const leform ={
      name: 'd',
      path: 'd',
      imagePath:'d' ,
    };
    if(component.categoryForm.get('name')?.value === leform.name){
      spyOn( component, "valueByControl" ).and.callThrough();
      component.valueByControl('name');
      expect(component.valueByControl).toHaveBeenCalled();
      expect( component.valueByControl('name')).toBe('d');
    }
  });

  it('should addCategory', () => {
    spyOn( component, "addCategory" ).and.callThrough();
    component.addCategory();
    expect(component.addCategory).toHaveBeenCalled();
    expect( component.textAction).toBe( true );
  });

  it('should edit category', () => {
    const category = {
      name: 'ddd',
      path: 'ddd',
      imagePath: 'ddd',
      id:3,
    }
    spyOn( component, "editCategory" ).and.callThrough();
    component.editCategory( category );
    expect(component.editCategory).toHaveBeenCalled();
    expect( component.editStatus).toBe( true );
    expect( component.isUploaded).toBe( true );
    expect( component.textAction).toBe( false );
  });

});

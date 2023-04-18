import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsComponent } from './admin-products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('ProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsComponent ],
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { provide: Storage , useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addAction', () => {
    spyOn( component, "addAction" ).and.callThrough();
    component.addProduct();
    expect(component.addProduct).toHaveBeenCalled();
    expect( component.isUploaded).toBe( false );
    expect( component.editStatus).toBe( false );
  });

  it('should editAction', () => {
    const product = {
      category: 'string',
      name: 'string',
      path: 'string',
      weight: 2,
      consist: 'string',
      price: 2,
      imagePath: 'string',
      id: 2,
      count: 2,
    }
    spyOn( component, "editAction" ).and.callThrough();
    component.editProduct(product);
    expect(component.editProduct).toHaveBeenCalled();
    expect( component.isUploaded).toBe( true );
    expect( component.editStatus).toBe( true );
    expect( component.textAction).toBe( false );
    expect( component.currentProductId).toBe( 2 );
  });
});

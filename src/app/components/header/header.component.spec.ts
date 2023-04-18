import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[
        HttpClientTestingModule,
        MatDialogModule,
        RouterModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change total', () => {
    const Fake_Basket = [
      {
        category: 'string',
        name: 'string',
        path: 'string',
        weight: 10,
        consist: 'string',
        price: 10,
        imagePath: 'string',
        id: 1,
        count: 2,
      }
    ]
    component.basket = Fake_Basket;
    spyOn( component, "getBasketInfo" ).and.callThrough();
    component.getBasketInfo();
    expect(component.getBasketInfo).toHaveBeenCalled();
    expect( component.basketInfo.total).toBe(20);
    expect( component.basketInfo.count).toBe(1);
  });

  it('should delet bascet product', () => {
    const index = 1;
    const product = {
      category: 'string',
      name: 'string',
      path: 'string',
      weight: 10,
      consist: 'string',
      price: 10,
      imagePath: 'string',
      id: 1,
      count: 2,
    }
    const Fake_Basket = [
      {
        category: 'string',
        name: 'string',
        path: 'string',
        weight: 10,
        consist: 'string',
        price: 10,
        imagePath: 'string',
        id: 1,
        count: 2,
      },
      {
        category: 'string',
        name: 'string',
        path: 'string',
        weight: 10,
        consist: 'string',
        price: 10,
        imagePath: 'string',
        id: 2,
        count: 2,
      }
    ]
    component.basket = Fake_Basket;
    spyOn( component, "deletBasketProduct" ).and.callThrough();
    component.deletBasketProduct(product);
    expect(component.deletBasketProduct).toHaveBeenCalled();
    expect( component.basket.length).toBe(1);

  })

  it('change product count', () => {
    const boolean = true;
    const Fake_Product =
      {
        category: 'ddd',
        name: 'string',
        path: 'string',
        weight: 10,
        consist: 'string',
        price: 10,
        imagePath: 'string',
        id: 1,
        count: 2,
      };
    spyOn( component, "countProduct" ).and.callThrough();
    component.countProduct(Fake_Product,boolean);
    expect(component.countProduct).toHaveBeenCalled();
    expect( Fake_Product.count).toBe(3);
  });

});

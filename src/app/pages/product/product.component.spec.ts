import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {UpperPipe} from "../../shared/pipes/upper.pipe";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent,UpperPipe ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers:[
         UpperPipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change product count', () => {
    const boolean = true;
    const Fake_Product =
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
        };
    spyOn( component, "countProduct" ).and.callThrough();
    component.countProduct(Fake_Product,boolean);
    expect(component.countProduct).toHaveBeenCalled();
    expect( Fake_Product.count).toBe(3);
  });

    it('should addBasket', () => {
        const product = {
            category: 'string',
            name: 'string',
            path: 'rin',
            weight: 4,
            consist: 'string',
            price: 4,
            imagePath: 'string',
            id: 4,
            count: 4,
        }
        spyOn( component, "addBasket" ).and.callThrough();
        component.addBasket(product);
        expect(component.addBasket).toHaveBeenCalled();
        expect( product.count).toBe( 1 );
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfoComponent ],
      imports:[
          RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInfoComponent);
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
    component.currentProduct = Fake_Product;
    spyOn( component, "countProduct" ).and.callThrough();
    component.countProduct(Fake_Product,boolean);
    expect(component.countProduct).toHaveBeenCalled();
    expect( component.currentProduct.count).toBe(3);
  });

});

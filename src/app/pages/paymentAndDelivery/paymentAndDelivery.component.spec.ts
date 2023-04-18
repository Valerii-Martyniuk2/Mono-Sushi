import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndDeliveryComponent } from './paymentAndDelivery.component';

describe('PaymentAndDeliveryComponent', () => {
  let component: PaymentAndDeliveryComponent;
  let fixture: ComponentFixture<PaymentAndDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAndDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAndDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

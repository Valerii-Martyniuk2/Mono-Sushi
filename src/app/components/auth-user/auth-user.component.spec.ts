import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthUserComponent } from './auth-user.component';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Firestore } from '@angular/fire/firestore';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthUserComponent', () => {
  let component: AuthUserComponent;
  let fixture: ComponentFixture<AuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthUserComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,


      ],
      providers:[
        {provide:MatDialogRef , useValue:{} },
        {provide:Auth, useValue:{} },
        {provide:Firestore , useValue:{} },
        {provide:ToastrService , useValue:{} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

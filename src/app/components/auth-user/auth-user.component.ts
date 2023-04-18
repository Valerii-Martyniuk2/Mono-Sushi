import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from '../../shared/services/account/account.service';

@Component({
  selector: "app-auth-user",
  templateUrl: "./auth-user.component.html",
  styleUrls: ["./auth-user.component.scss"],
})
export class AuthUserComponent implements OnInit, OnDestroy {
  public subscriptions!: Subscription;
  public createForm!: FormGroup;
  public loginForm!: FormGroup;
  public isAccount: boolean = true;
  public invalidData!:string;


  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private afs: Firestore,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AuthUserComponent>,
    public dialog: MatDialog,
    public accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.initAuthForm();
    this.initLoginForm();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log("auth-user unsubscribe");
    }
  }

  /////////////////// LOGIN DATA //////////////

  initAuthForm(): void {
    this.createForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(1)]],
      lastName: [null, [Validators.required, Validators.minLength(1)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,this.passwordValidator]],
      passwordCheck: [null, [Validators.required,this.passwordValidator]],
    });
  }
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required,this.passwordValidator]],
    });
  }
  //////////////////VALIDATOR////////////
  passwordValidator(formControl: FormControl) {
    const regExp = /\d/;
    const regExp2 = /[a-zA-Z]+/;
    const regExp3 = /[a-zA-Z0-9]{5}/;
    if (
      regExp2.test(formControl.value) &&
      regExp.test(formControl.value) &&
      regExp3.test(formControl.value)
    ) {
      return null;
    }

    return { mes: { mes: "sd" } };
  }

  checkConfirmedPassword() :any {
  if (this.password.value !== this.passwordCheck.value) {
      this.createForm.controls["passwordCheck"].setErrors({
        matchError: "Passwords is different",
      });
    }
  }

  get password(): AbstractControl {
    return this.createForm.controls["password"];
  }
  get passwordCheck(): AbstractControl {
    return this.createForm.controls["passwordCheck"];
  }

  checkEmail(): void {
    const regExp = /@\w+\./;
    if (!regExp.test(this.email.value)) {
      this.createForm.controls["email"].setErrors({
        emError: "Email is wrong ",
      });
    }
  }
  checkEmail2(): void {
    const regExp = /@\w+\./;
    if (!regExp.test(this.email2.value)) {
      this.loginForm.controls["email"].setErrors({
        emError: "Email is wrong ",
      });
    }
  }
  get email(): AbstractControl {
    return this.createForm.controls["email"];
  }
  get email2(): AbstractControl {
    return this.loginForm.controls["email"];
  }
  checkVisibiliryError(control: string, name: string): boolean | null {
    return this.createForm.controls[control].errors?.[name];
  }
  checkVisibiliryError2(control: string, name: string): boolean | null {
    return this.loginForm.controls[control].errors?.[name];
  }


  ////////LOGIN////////

  login(): void {
    const { email, password } = this.loginForm.value;
    this.loginUser(email, password)
      .then(() => {this.dialogRef.close();})
      .catch((e) => {
        console.log(e.message);
        if(e.message == 'Firebase: Error (auth/wrong-password).'){
          this.invalidData = 'Wrong password'

        }
        else if(e.message == 'Firebase: Error (auth/user-not-found).'){
          this.invalidData = 'User not found'

        }else{
          this.invalidData = e.message
        }
      });
  }

  async loginUser(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = await getDoc(doc(this.afs, "users", credential.user.uid));
    const currentUser = { ...user.data(), uid: credential.user.uid };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.accountService.isUserLogin$.next(true);
    this.accountService.isUserLoginInfo$.next(true);
    const uskey = user.data();
    if (uskey && uskey["role"] === ROLE.USER) {
      this.router.navigate(["/user"]);
    } else if (uskey && uskey["role"] === ROLE.ADMIN) {
      this.router.navigate(["/admin"]);
    }
  }
  ////////////////////////CREATE ACCOUNT////////////////
  create(): void {
    const { firstName, lastName, phoneNumber, email, password, passwordCheck } =
      this.createForm.value;
    if (password === passwordCheck) {
      this.emailSignUp(firstName, lastName, phoneNumber, email, password)
        .then(() => {
          this.createForm.reset();
          this.dialogRef.close();
        })
        .catch((e) => {
          this.toastr.error(e.message);
        });
    } else {
      this.toastr.error("passwords do not match");
    }
  }
  async emailSignUp(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
  ): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      email: credential.user.email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      addres: "",
      orders: [],
      role: "USER",
    };
    setDoc(doc(this.afs, "users", credential.user.uid), user);
    this.createForm.reset();
  }
  /////////////CLOSE COMPONENT//////////////
  closeComponent(): void {
    this.dialog.closeAll();
  }
}

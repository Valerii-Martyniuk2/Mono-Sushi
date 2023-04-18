import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.scss']
})
export class PasswordchangeComponent {
  public passwordForm!: FormGroup;
  public user!: any;

  constructor(
      private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initUserForm();
  }
  initUserForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      newPasswordControl: [null, [Validators.required]],
    });
  }
}

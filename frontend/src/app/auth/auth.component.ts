import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: [] = [];
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authType = this.router.url.slice(1, this.router.url.length);
    // Set a title for the page accordingly
    this.title = this.authType == 'login' ? 'Sign in' : 'Sign up';
    // add form control for username if this is the register page
    if ( this.authType == 'register' ) {
      this.authForm.addControl('username', new FormControl());
    }
    this.cd.markForCheck();
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    console.log(this.authType);
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err.error.msg;
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }
}

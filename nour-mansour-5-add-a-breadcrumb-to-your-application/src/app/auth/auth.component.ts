import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observer } from 'rxjs';
import { ApiResponse } from '../models/api-response.interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginForm: boolean = true;
  message: string = '';
  mismatch: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
    });
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    console.log('Entering passwordMatchValidator');

    if (!this.authForm) {
      console.log('authForm not found');
      return null;
    }

    const passwordControl = this.authForm.get('password');
    const confirmPassword = control.value;

    console.log('passwordControl:', passwordControl);
    console.log('confirmPassword:', confirmPassword);

    if (passwordControl) {
      const password = passwordControl.value;

      console.log('password:', password);

      this.mismatch =
        password && confirmPassword && password !== confirmPassword;

      console.log('mismatch:', this.mismatch);

      return this.mismatch ? { passwordMismatch: true } : null;
    }

    console.log('passwordControl not found');
    return null;
  }

  submitForm() {
    const formData = this.authForm.value;

    const observer: Observer<ApiResponse> = {
      next: (response) => {
        // Handle successful response
        this.message = this.isLoginForm
          ? 'Login successful!'
          : 'Sign Up successful!';
        console.log(
          this.isLoginForm ? 'Login Response:' : 'Sign Up Response:',
          response
        );
      },
      error: (error) => {
        // Handle error
        this.message = this.isLoginForm
          ? 'Login failed. An error occurred.'
          : 'Sign Up failed. An error occurred.';
        console.error(
          this.isLoginForm ? 'Login Error:' : 'Sign Up Error:',
          error
        );
      },
      complete: function (): void {
        console.log('Observable completed.');
      },
    };

    if (this.isLoginForm) {
      this.authService
        .login(formData.username, formData.password)
        .subscribe(observer);
    } else {
      this.authService.signUp(formData).subscribe(observer);
    }
  }

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
    this.message = '';
  }
}

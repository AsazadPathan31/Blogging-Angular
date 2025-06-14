import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  logInForm!: FormGroup;
  userid!: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {

    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  onSubmit() {
    if (this.logInForm.invalid) {
      return;
    }
    const username = this.logInForm.get('username')?.value;
    const password = this.logInForm.get('password')?.value;
    this.authService.signIn(username, password);
  }
}

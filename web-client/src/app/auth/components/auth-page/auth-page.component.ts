import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less']
})
export class AuthPageComponent {

  public authForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public registrationForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }


  public signIn() {
    if (this.authForm.invalid) {
      return;
    }
    const { login, password } = this.authForm.value;

    this.auth.signIn(login, password).subscribe(user => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }

  public registration() {
    if (this.registrationForm.invalid) {
      return;
    }

    const { login, password } = this.authForm.value;

    this.auth.registration(login, password).subscribe();
  }

}

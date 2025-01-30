import { Component, signal } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JournelService } from '../../services/journel.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatLabel,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    public journelService: JournelService,
    public snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      {
        this.journelService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
          next: result => {
            localStorage.setItem('journel.token', result.token);
            localStorage.setItem('journel.username', result.username);
          },
          error: err => {
            this.snackBar.open(err, 'error', {
              duration: 2000
            });
          }
        })
      }
    }
  }

  //To show/hide the password visibility
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

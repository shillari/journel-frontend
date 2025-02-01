import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JournelService } from '../../services/journel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    DefaultLoginLayoutComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatLabel,
    ReactiveFormsModule,
    NgIf,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm!: FormGroup

  constructor(
    public journelService: JournelService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  signupUser(): void {
    if (this.signupForm.valid) {
      this.journelService.register(this.signupForm.value.email, this.signupForm.value.username, this.signupForm.value.password).subscribe({
        next: result => {
          localStorage.setItem('journel.token', result.token);
          localStorage.setItem('journel.username', result.username);
          this.router.navigate(['/login']);
        },
        error: err => {
          this.snackBar.open(err, 'error', {
            duration: 2000
          });
        }
      });
    }
  }

  //To show/hide the password visibility
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

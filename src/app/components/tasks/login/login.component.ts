import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = signal('');
  password = signal('');
  toggleVisibility = signal(true);

  login() {
    /*
    this.getJwtToken()
      .pipe(
        switchMap((data) => {
          if (data) {
            this.sessionService.setToken(data.token);
            return this.getAuthorizedUserDetails();
          } else {
            throw new Error('Invalid credentials');
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.sessionService.setSession(data);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.snackBar.showErrorSnackBar(error);
          this.username.set('');
          this.password.set('');
        },
      });

     */
  }

  clickEvent(event: MouseEvent) {
    this.toggleVisibility.set(!this.toggleVisibility());
    event.stopPropagation();
  }

}

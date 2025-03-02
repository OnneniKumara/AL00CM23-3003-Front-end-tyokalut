import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Router, RouterModule} from '@angular/router';
import {Observable, switchMap, tap} from 'rxjs';
import {PopUpService} from '../../../services/pop-up.service';
import {UserDTO} from '../../../models/UserDTO/user-dto';
import {ApiService} from '../../../services/api.service';
import {SessionManagementService} from '../../../services/session-management.service';


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

  // Palvelut

  // ApiService
  apiService = inject(ApiService);

  // SessionManagementService
  sessionService = inject(SessionManagementService);

  // Router
  router = inject(Router);

  // PopUpService
  private popUpService = inject(PopUpService);

  username = signal('');
  password = signal('');
  toggleVisibility = signal(true);

  private loginUrl = "https://localhost:7121/api/Account/login";
  private userAuthorizedUrl = "https://localhost:7121/api/Account/user/authorized";

  login() {

    this.getJwtToken()
      .pipe(
        switchMap((data) => {
          if (data) {
            this.sessionService.setToken(data.token);
            return this.getAuthorizedUserDetails();
          } else {
            throw new Error('Virheellinen käyttäjätunnus tai salasana');
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.sessionService.setSession(data);
            this.router.navigate(['/acp']);
          }
        },
        error: (error) => {
          const errorMessage = JSON.stringify(error);
          this.popUpService.openDialog("Tapahtui virhe: " + errorMessage);
          this.username.set('');
          this.password.set('');
        },
      });

  }

  getJwtToken(): Observable<any> {
    return this.apiService.post<any>(
      this.loginUrl,
      {username: this.username(), password: this.password()},
      {}
    );
  }

  getAuthorizedUserDetails(): Observable<UserDTO> {
    return this.apiService.get<UserDTO>(this.userAuthorizedUrl, {}).pipe(
      tap((user) => {
        this.sessionService.setSession(user);
      })
    );
  }

  clickEvent(event: MouseEvent) {
    this.toggleVisibility.set(!this.toggleVisibility());
    event.stopPropagation();
  }

}

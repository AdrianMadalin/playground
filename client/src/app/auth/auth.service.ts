import {Injectable} from "@angular/core";
import {UserModel} from "./user-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService {
  public registerError = false;
  public token: string;

  constructor(private http: HttpClient,
              private router: Router) {

  }

  registerUser(user: UserModel) {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/users/register';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post<{ status: string, message: string }>(srvPrefix + url, user, {headers: headers})
      .subscribe((response) => {
        if (response.status === 'success') {
          console.log(response);
          this.router.navigate(['/app/login']);
        }
      }, (error) => {
        console.log(error);
        alert(`User exists in the database. ${error.error.error.message}`);
      })
  }

  loginUser(user: UserModel) {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/users/login';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post<{ status: string, token: string, userId: string }>(srvPrefix + url, user, {headers: headers})
      .subscribe((response) => {
        if (response.status === 'success') {
          console.log(response);
          this.saveCredentials( { userId: response.userId, token: response.token });
          this.router.navigate(['/']);
        }
      }, (error) => {
        console.log(error);
        alert(`User exists in the database. ${error.error.error.message}`);
      })
  }

  public saveCredentials(userCredentials: { userId: string, token: string }) {
    localStorage.setItem('userId', userCredentials.userId);
    localStorage.setItem('token', userCredentials.token);
  }

  public getToken() {
    if(localStorage.getItem('token')) {
      return localStorage.getItem('token')
    } else {
      return null;
    }
  }

  public clearToken() {
    localStorage.removeItem('token');
  }

  public logout() {
    localStorage.clear();
  }
}

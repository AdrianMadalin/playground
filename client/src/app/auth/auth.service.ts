import {Injectable} from "@angular/core";
import {UserModel} from "./user-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  registerUser(user: UserModel) {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/users/register';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(srvPrefix + url, user, {headers: headers})
      .subscribe((response) => {
        console.log(response);

      }, (error) => {
        console.log(error);
      })
  }
}

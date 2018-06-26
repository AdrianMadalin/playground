import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image} from "./image";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: "root"})
export class PhotoVideoService {
  private images: Image[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService) {

  }

  getImages() {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/gallery/images';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<{ message: string, images: Image[] }>(srvPrefix + url, {headers})
  }

  uploadImage(formData: FormData) {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/gallery/images';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<{ message: string, images: Image[] }>(srvPrefix + url, formData, {headers})
  }

  deteleImage(id: string) {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/gallery/images/' + id;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete<{ message: string, images: Image[] }>(srvPrefix + url, {headers})
  }


}

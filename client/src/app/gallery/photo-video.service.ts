import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image} from "./image";

@Injectable({providedIn: "root"})
export class PhotoVideoService {
  private images: Image[] = [];

  constructor(private http: HttpClient) {

  }

  uploadImage(formData: FormData) {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/gallery/images';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(srvPrefix + url, formData, {headers})
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

  getImages() {
    const srvPrefix = 'http://localhost:8080';
    const url = '/api/gallery/images';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get<{ message: string, images: Image[] }>(srvPrefix + url, {headers})
      .subscribe((response) => {
        console.log(response);
        this.images = response.images;
        console.log(this.images);
      }, (error) => {
        console.log(error);
      });
  }

  getAllImages() {
    console.log(this.images);
    return this.images;
  }


}

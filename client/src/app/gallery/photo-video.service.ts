import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image} from "./image";
import {Video} from "./video";

@Injectable({providedIn: "root"})
export class PhotoVideoService {
  private srvPrefix = 'http://localhost:8080';
  private imagesUrl = '/api/gallery/images';
  private videoUrl = '/api/gallery/videos';
  constructor(private http: HttpClient) {

  }

  public getImages() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<{ message: string, images: Image[] }>(this.srvPrefix + this.imagesUrl, {headers})
  }

  public uploadImage(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<{ message: string, images: Image[] }>(this.srvPrefix + this.imagesUrl, formData, {headers})
  }

  public deteleImage(id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete<{ message: string, images: Image[] }>(`${this.srvPrefix}${this.imagesUrl}/${id}`, {headers})
  }

  public getVideos() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<{ message: string, videos: Video[] }>(this.srvPrefix + this.videoUrl, {headers})
  }

  public uploadVideo(videoIframe: {url: string}) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<{ message: string, video: Video }>(this.srvPrefix + this.videoUrl, videoIframe, {headers})
  }

  public deteleVideo(id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete<{ message: string, video: Video }>(`${this.srvPrefix}${this.videoUrl}/${id}`, {headers})
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PhotoVideoService} from "../photo-video.service";
import {Image} from "../image";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  public uploadImageForm: FormGroup;
  selectedFile: File = null;
  imageFormData: FormData = null;
  public images: Image[] = [];
  public isAuth: Boolean = false;

  constructor(private photoVideoSrv: PhotoVideoService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.isAuth = !!this.authService.getToken();
    console.log(this.isAuth);
    this.getImages();
    this.uploadImageForm = new FormGroup({
      image: new FormControl(null, [Validators.required])
    });

  }

  public getImages() {
    this.photoVideoSrv.getImages()
      .subscribe((response) => {
        console.log(response);
        this.images = response.images;
        console.log(this.images);
      }, (error) => {
        console.log(error);
      });
  }

  onFileSelected(event) {
    const files = event.target.files.length;
    this.selectedFile = <File>event.target.files;
    this.imageFormData = new FormData();
    for (let i = 0; i < files; i++) {
      if (this.selectedFile[i].type === 'image/jpeg' ||
        this.selectedFile[i].type === 'image/jpg' ||
        this.selectedFile[i].type === 'image/png') {
        this.imageFormData.append('image', this.selectedFile[i], this.selectedFile[i].name);
      }
    }
  }

  public onUploadImage() {
    this.photoVideoSrv.uploadImage(this.imageFormData)
      .subscribe((response) => {
        console.log(response);
        for (let i = 0; i < response.images.length; i++) {
          this.images.unshift(response.images[i])
        }
      }, (error) => {
        this.authService.clearToken();
        this.isAuth = false;
        if (error.error.message === "You are not authenticated!") {
          this.router.navigate(['/app/login']);
        }

        if (error.message === "Fail to save images to the database") {
          alert('Server error');
        }

        console.log(error);
        alert('Server error');
      });

  }

  public onRemoveImage(index: number, id: string) {
    this.photoVideoSrv.deteleImage(id)
      .subscribe(response => {
        this.images.splice(index, 1);
      }, error => {
        if (error.error.message === "You are not authenticated!") {
          alert('Sesiune expirata. Va rugam sa va relogati');
          this.isAuth = false;
          this.authService.clearToken();
          this.router.navigate(['/app/login']);
        }
      })
  }

}

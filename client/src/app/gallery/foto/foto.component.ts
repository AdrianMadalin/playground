import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PhotoVideoService} from "../photo-video.service";
import {Image} from "../image";

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

  constructor(private photoVideoSrv: PhotoVideoService) {
  }

  ngOnInit() {
    this.uploadImageForm = new FormGroup({
      image: new FormControl(null, [Validators.required])
    });

    this.photoVideoSrv.getImages();
    this.images = this.photoVideoSrv.getAllImages();
    console.log(this.images);
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

  onSubmitImage() {
    console.log(this.uploadImageForm);
    this.photoVideoSrv.uploadImage(this.imageFormData);
  }

}

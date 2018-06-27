import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Image} from "../image";
import {AuthService} from "../../auth/auth.service";
import {PhotoVideoService} from "../photo-video.service";
import {Router} from "@angular/router";
import {Video} from "../video";
import {ValidateVideoUrl} from '../video.validator';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  public uploadMovieUrlForm: FormGroup;
  public images: Image[] = [];
  public isAuth: Boolean = false;
  public isDisplayed: Boolean = false;
  public iFrameURL: string = '';
  public videos: Video[] = [];
  public video: { _id: string, index: number } = {_id: 'one', index: 0};


  constructor(private photoVideoSrv: PhotoVideoService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.isAuth = !!this.authService.getToken();
    this.getVideos();

    this.uploadMovieUrlForm = new FormGroup({
      url: new FormControl(null, [Validators.required, ValidateVideoUrl])
    });
  }

  public getVideos() {
    this.photoVideoSrv.getVideos().subscribe(response => {
      console.log(response);
      this.videos = response.videos;
      const videoOne = response.videos[0].url.split('/');
      console.log(videoOne[0]);
      console.log(videoOne[2]);
    }, error => {
      console.log(error);
    })
  }

  public onMovieUrlInserted(event: HTMLInputElement) {
    this.iFrameURL = (<HTMLInputElement>event['target']).value;
  }

  public onUploadMovieUrl() {
    console.log(this.uploadMovieUrlForm);

    // this.photoVideoSrv.uploadVideo({url: this.iFrameURL})
    //   .subscribe(response => {
    //     console.log(response);
    //     this.videos.unshift(response.video)
    //   }, error => {
    //     console.log(error);
    //   })
  }

  public onRemoveBtnClick(index: number, id: string) {
    console.log(`index ${index}`);
    console.log(`id ${id}`);
    this.video._id = id;
    this.video.index = index;
    this.isDisplayed = true;
  }

  public onDeleteVideo() {
    this.photoVideoSrv.deteleVideo(this.video._id)
      .subscribe(response => {
        console.log(response);
        this.videos.splice(this.video.index, 1);
        this.isDisplayed = false;
      }, error => {
        if (error.error.message === "You are not authenticated!") {
          console.log(error);

          alert('Sesiune expirata. Va rugam sa va relogati');
          this.isAuth = false;
          this.authService.clearToken();
          this.router.navigate(['/app/login']);
        }
      })
  }


}

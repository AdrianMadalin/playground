import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuth: Boolean = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.isAuth = !!this.authService.getToken();
    console.log(this.isAuth);

    this.authSubscription = this.authService.getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

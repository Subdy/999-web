import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title: string
  constructor(
    public router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url !== "/desktop/login") this.title = "Register"
      else this.title = "Log in"
    });
    this.removeSplash()
  }
  removeSplash() {
    let splash = document.getElementById("lottie-splash")
    if (splash) splash.remove()
  }
}

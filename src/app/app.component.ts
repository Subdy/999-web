import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { FirebaseService } from './service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public options: AnimationOptions = {
    path: '/assets/splash/1.json',
  };
  constructor(
    public platform: Platform,
    private router: Router,
    private service: FirebaseService,
  ) {
    this.setImg(),
      this.service.checkTheme()
    if (platform.width() < 768) this.navigateMobile()
    else this.navigateDesktop()
  }
  setImg() {
    let img = this.service.getValue("hulu-img")
    if (!img) {
      this.service.setValue('hulu-img', { img: '/assets/1.jpg', id: 1 })
    }
  }
  private navigateDesktop(): void {
    this.router.navigate([''])
  }
  private navigateMobile(): void {
    this.router.navigate(['/mobile'])
  }
  public change() {
    this.options = { path: `/assets/splash/1.json` }
  }

}

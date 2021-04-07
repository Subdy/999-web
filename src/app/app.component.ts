import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public options: AnimationOptions = {
    path: '/assets/splash/1.json',
    loop: 0
  };
  constructor(
    public platform: Platform,
    private router: Router,
  ) {
    console.log("A")
    if (platform.width() < 768) this.navigateMobile()
    else this.navigateDesktop()
  }

  private navigateDesktop(): void {
    this.router.navigate([''])
  }
  private navigateMobile(): void {
    this.router.navigate(['/mobile'])
  }
  changeNum: number = 1;
  public change() {
    if (this.changeNum == 3) {
      this.changeNum = 1
    } else {
      this.changeNum += 1
    }
    this.options = { loop: 0, path: `/assets/splash/${this.changeNum}.json` }
  }

}

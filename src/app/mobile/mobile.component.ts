import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent {
  img: any = ''
  constructor(
    private router: Router,
    public service: FirebaseService,
    private navCtrl: NavController
  ) {
    this.img = this.service.setBackgroundImg()
    this.removeSplash()
  }
  removeSplash() {
    let splash = document.getElementById("lottie-splash")
    if (splash) splash.remove()
  }
  gotoMusic() {
    this.navCtrl.navigateRoot('mobile/music')
  }
  gotoPratice() {
    this.router.navigate(['/mobile/table'])
  }
  openTheme() {
    this.navCtrl.navigateRoot('mobile/theme')
    // this.service.showModal(ThemeComponent, {}, false, false).then((modal) => {
    //   modal.onWillDismiss().then(() => {
    //     this.img = this.service.getValue('hulu-img').img
    //   })
    // })
  }
  buyBook() {
    this.navCtrl.navigateRoot('mobile/book')
    // this.service.showModal(BooksComponent, {}, true, true).then((modal) => {
    //   modal.onWillDismiss().then((data) => {
    //   })
    // })
  }
}

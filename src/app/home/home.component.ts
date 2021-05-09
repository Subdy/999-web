import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../service/firebase.service';
import { BooksComponent } from './books/books.component';
import { ThemeComponent } from './theme/theme.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  img: any = ''
  best: any = [
    { title: "Đắc Nhân Tâm", img: "", url: '' }
  ]
  constructor(
    private router: Router,
    public service: FirebaseService,
    private navCtrl: NavController
  ) {
    this.img = this.service.setBackgroundImg()
  }
  ngOnInit(): void {
    this.removeSplash()
  }
  removeSplash() {
    let splash = document.getElementById("lottie-splash")
    if (splash) splash.remove()
  }

  gotoMusic() {
    this.navCtrl.navigateRoot('/music')
  }
  gotoPratice() {
    this.router.navigate(['/table'])
  }
  openTheme() {
    this.service.showModal(ThemeComponent, {}, true, true).then((modal) => {
      modal.onWillDismiss().then((data) => {
        if (data) this.img = this.service.getValue('hulu-img').img
      })
    })
  }
  buyBook() {
    this.service.showModal(BooksComponent, {}, true, true).then((modal) => {
      modal.onWillDismiss().then((data) => {
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/service/firebase.service';
const { Browser } = Plugins;
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  img: any = ''
  constructor(
    public service: FirebaseService,
  ) {
    this.img = this.service.setBackgroundImg()
  }

  ngOnInit() { }
  openBuy(url) {
    Browser.open({ url: url });
  }
  goBack() {
    this.service.hideModal()
  }
}

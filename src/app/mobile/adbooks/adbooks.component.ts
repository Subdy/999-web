import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { FirebaseService } from 'src/app/service/firebase.service';
const { Browser } = Plugins;

@Component({
  selector: 'app-adbooks',
  templateUrl: './adbooks.component.html',
  styleUrls: ['./adbooks.component.scss']
})
export class AdbooksComponent implements OnInit {

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

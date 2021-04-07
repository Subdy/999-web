import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { IonSlides, NavController, Platform, AnimationController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
const { App, Toast } = Plugins
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public platform: Platform,
    private animationCtrl: AnimationController,
    private screenOrientation: ScreenOrientation,
  ) {
  }
}

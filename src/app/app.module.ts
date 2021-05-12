import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/**Native Plugin */
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
//===================MQTT=============//
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FirebaseService, StorageService } from './service/firebase.service';
registerLocaleData(en);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const config: SocketIoConfig = { url: '', options: {} };

const routes: Routes = [
  {
    path: 'mobile',
    loadChildren: () => import('./mobile/mobile.module').then(m => m.MobileModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
]

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot({
      swipeBackEnabled: false,
      backButtonText: "",
    }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })],
  providers: [
    Camera, WebView, ImagePicker, File, SocialSharing, InAppPurchase2,
    VhComponent,
    WifiWizard2,
    ScreenOrientation,
    BarcodeScanner,
    StorageService, DatePipe,
    FirebaseService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

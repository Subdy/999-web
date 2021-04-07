import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { VhAuth, VhQuerySales } from 'ionic-vhframeworks';
import { LanguageService } from 'src/app/services/language.service';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { LanguageComponent } from './language/language.component';
import { Plugins } from '@capacitor/core';
const { Keyboard } = Plugins
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public _SCREEN_HEIGHT: number = 0;
  public _LOGIN: boolean = false;
  public _SHOW_PASS: boolean = false;
  constructor(
    private platform: Platform,
    private vhAuth: VhAuth,
    private vhQuerySales: VhQuerySales,
    private vhComponent: VhComponent,
    private navCtrl: NavController,
    private languageService: LanguageService,
  ) { this.removeSplash() }

  ngAfterViewInit() {
    this._SCREEN_HEIGHT = this.platform.height()
  }
  removeSplash() {
    let splash = document.getElementById("lottie-splash")
    if (splash) splash.remove()
  }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public checkKey(event) {
    if (event.keyCode == 13 && this.loginForm.valid) {
      if (this.platform.is("desktop") || this.platform.is("mobileweb"))
        this.tryLogin(this.loginForm.value)
      else Keyboard.hide().then(() => this.tryLogin(this.loginForm.value))
    }
  }

  public tryLogin(value) {
    this.vhComponent.showLoading("", "transparent-loading").then(() => {
      this.vhAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(() => {
          this.vhQuerySales.refreshLocalBranchs()
            .then(() => {
              this.navCtrl.navigateRoot(["mobile/tabs"]);
            })
        }, (error) => {
          console.error(error)
          this.vhComponent.showToast(3000, this.languageService.translate(error.message), "alert-toast")
        }).finally(() => this.vhComponent.hideLoading(0))
    })

  }
  //////////////////////////////////LANGUAGE///////////////////////////////////
  private langList: any[] = [
    { name: 'Vietnamese', value: 'vi', img: 'assets/icon/settings/language/vi.svg' },
    { name: 'English', value: 'en', img: 'assets/icon/settings/language/en.svg' }
  ];
  public lang: any = this.langList.find(item => item.value == localStorage.getItem("vhsecuritycam-language"))
  public selectLang() {
    this.vhComponent.showModal(LanguageComponent, {}).then(modal => {
      modal.onWillDismiss().then(value => {
        this.lang = this.langList.find(item => item.value == localStorage.getItem("vhsecuritycam-language"))
      })
    })
  }

  //////////////////////////////////FORGOT PASSWORD////////////////////////////
  forgotPassword() {
    this.vhComponent.alertInputRadioCheckbox(this.languageService.translate('Forgot password?'), "", "OK", this.languageService.translate('Cancel'), [
      { name: "email", type: 'email', placeholder: 'Email' }
    ]).then(({ value }) => {
      if ((/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/).test(value.email)) {
        this.vhAuth.resetPasswordbyEmail(value.email).then(bool => {
          if (bool) this.vhComponent.showToast(2000, this.languageService.translate("Email has been sent successfully"), "success-toast")
          else this.vhComponent.showToast(2000, this.languageService.translate("Email sending failed"), "alert-toast")
        })
      } else {
        this.vhComponent.showToast(2000, this.languageService.translate("Email invalid"), "alert-toast")
      }
    }, () => { })
  }


}

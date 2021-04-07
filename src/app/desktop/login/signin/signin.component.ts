import { Component, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VhAlgorithm, VhAuth, VhQuerySales } from 'ionic-vhframeworks';
import { LanguageService } from 'src/app/services/language.service';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { SearchLangComponent } from '../search-lang/search-lang.component';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public _SHOW_PASS: boolean = false;
  constructor(
    private vhAuth: VhAuth,
    private vhQuerySales: VhQuerySales,
    private vhComponent: VhComponent,
    private vhAlgorithm: VhAlgorithm,
    private router: Router,
    private languageService: LanguageService
  ) { }

  public _VALIDATION_MESSAGES: any = {
    email: [
      { type: "required", message: this.languageService.translate("User name is required") },
      {
        type: "minlength",
        message: this.languageService.translate("User name must be at least 5 characters long")
      }
    ],
    password: [
      { type: "required", message: this.languageService.translate("Password is required") },
      {
        type: "minlength",
        message: this.languageService.translate("Password must be at least 5 characters long")
      }
    ]
  };

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  public checkKey(event, formCtrlName) {
    if (event.keyCode == 13 && this.loginForm.valid) {
      this.tryLogin(this.loginForm.value)
    } else {
      if (this.loginForm.get(formCtrlName).hasError('pattern')) {
        this.loginForm.controls[formCtrlName].setValue(this.vhAlgorithm.changeAlias(this.loginForm.controls[formCtrlName].value).replace(/[^(a-z,A-Z,0-9)]/, ''))
      }
    }
  }
  public tryLogin(value) {
    this.vhComponent.showLoading("", "transparent-loading").then(() => {
      this.vhAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(() => {
          this.vhQuerySales.refreshLocalBranchs()
            .then(() => {
              //console.log('mybranch ', this.vhQuerySales.getLocalMyBranch());
              this.router.navigate([""]);
            })
        }, (error) => {
          console.error(error)
          this.vhComponent.showToast(3000, this.languageService.translate(error.message), "alert-toast")
        }).finally(() => this.vhComponent.hideLoading(0))
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

  //////////////////////////////////LANGUAGE///////////////////////////////////
  private langList: any[] = [
    { name: 'Vietnamese', value: 'vi', img: 'assets/icon/settings/language/vi.svg' },
    { name: 'English', value: 'en', img: 'assets/icon/settings/language/en.svg' }
  ];
  public lang: any = this.langList.find(item => item.value == localStorage.getItem("vhsecuritycam-language"))
  public selectLang() {
    this.vhComponent.showModal(SearchLangComponent, {}).then(modal => {
      modal.onWillDismiss().then(value => {
        this.lang = this.langList.find(item => item.value == localStorage.getItem("vhsecuritycam-language"))
      })
    })
  }

}

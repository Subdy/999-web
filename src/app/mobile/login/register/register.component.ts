import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { VhAuth, VhQuerySales, VhAlgorithm } from 'ionic-vhframeworks';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { LanguageService } from 'src/app/services/language.service';
import { SearchPhoneCodeComponent } from '../search-phone-code/search-phone-code.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public errorMessage: string = "";
  public _SHOW_PASS: boolean = false;

  constructor(
    private platform: Platform,
    private vhAuth: VhAuth,
    private vhQuerySales: VhQuerySales,
    private vhAlgorithm: VhAlgorithm,
    private navCtrl: NavController,
    private languageService: LanguageService,
    private vhComponent: VhComponent
  ) { }

  // public _VALIDATION_MESSAGES: any = {
  //   scode: [
  //     { type: "required", message: this.languageService.translate("Store name is required") },
  //     {
  //       type: "minlength",
  //       message: this.languageService.translate("Store name must be at least 5 characters long")
  //     }
  //   ],
  //   username: [
  //     { type: "required", message: this.languageService.translate("User name is required") },
  //     {
  //       type: "minlength",
  //       message: this.languageService.translate("User name must be at least 5 characters long")
  //     }
  //   ],
  //   password: [
  //     { type: "required", message: this.languageService.translate("Password is required") },
  //     {
  //       type: "minlength",
  //       message: this.languageService.translate("Password must be at least 5 characters long")
  //     }
  //   ],
  //   company: [
  //     { type: "required", message: this.languageService.translate("Company name is required") }
  //   ],
  //   name: [
  //     { type: "required", message: this.languageService.translate("Full name is required") }
  //   ],
  //   phone: [
  //     { type: "required", message: this.languageService.translate("Phone number is required") }
  //   ],
  //   address: [
  //     { type: "required", message: this.languageService.translate("Address is required") }
  //   ],
  // };

  // ngAfterViewInit() {
  //   this._SCREEN_HEIGHT = this.platform.height()
  // }


  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    // company: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("^([1-9])+[0-9]*")]),
    address: new FormControl(null, [Validators.required]),
  })
  public country_code: string = "+84";

  public searchPhoneCode() {
    this.vhComponent.showModal(SearchPhoneCodeComponent, {}).then(modal => {
      modal.onWillDismiss().then(({ data }) => {
        if (data) this.country_code = data
      })
    })
  }

  public checkKey(event) {
    if (this.registerForm.invalid) {
      let val: string = this.registerForm.value["phoneNumber"].replace(/^([0])+/g, "")
      this.registerForm.controls["phoneNumber"].setValue(val)
    }
  }

  public tryRegister(value) {
    this.vhComponent.showLoading('').then(() => {
      let info = { ...value, country_code: this.country_code };
      delete info.email; delete info.password;
      this.vhAuth.signUpOwner(value.email, value.password, this.country_code + value.phoneNumber, info)
        .then((res) => {
          
          this.vhComponent.hideLoading(0);
          this.errorMessage = "Register for succeed";
          this.tryLogin(value);
        }, (err) => {
          this.vhComponent.hideLoading(0);
          console.error(err);
          this.errorMessage = 'Register no succeed';
        })
    })
  }

  goToLogin() {
    this.navCtrl.pop()
  }

  public tryLogin(value) {
    this.vhAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(() => {
        this.vhQuerySales.refreshLocalBranchs()
          .then(() => {
            
            this.navCtrl.navigateRoot(["mobile/tabs"]);
          })
      }, (error) => {
        console.log(error)
        this.errorMessage = 'wrong information';
      })
  }

}

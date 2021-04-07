import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { VhAuth, VhQuerySales, VhAlgorithm } from 'ionic-vhframeworks';

import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { LanguageService } from 'src/app/services/language.service';
import { SearchPhoneCodeComponent } from '../search-phone-code/search-phone-code.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public _SHOW_PASS: boolean = false;
  public errorMessage: string = "";
  public _SCREEN_HEIGHT: number = 0;
  constructor(
    private platform: Platform,
    private vhAuth: VhAuth,
    private vhQuerySales: VhQuerySales,
    private vhAlgorithm: VhAlgorithm,
    private router: Router,
    private languageService: LanguageService,
    private vhComponent: VhComponent
  ) { }

  // public _VALIDATION_MESSAGES: any = {
  //   email: [
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
  //   phoneNumber: [
  //     { type: "required", message: this.languageService.translate("Phone number is required") }
  //   ],
  //   address: [
  //     { type: "required", message: this.languageService.translate("Address is required") }
  //   ],
  // };

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._SCREEN_HEIGHT = this.platform.height()
  }


  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    company: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("^([1-9])+[0-9]*")]),
    address: new FormControl(null, [Validators.required])
  })
  public countrycode: string = "+84";
  public searchPhoneCode() {
    this.vhComponent.showModal(SearchPhoneCodeComponent, {}).then(modal => {
      modal.onWillDismiss().then(({ data }) => {
        if (data) this.countrycode = data.code
      })
    })
  }
  public checkKey() {
    if (this.registerForm.invalid) {
      let val: string = this.registerForm.value["phone"].replace(/^([0])+/g, "")
      this.registerForm.controls["phone"].setValue(val)
    }
  }

  // public enter(event, formCtrlName) {
  //   if (event.code == "Enter" && this.registerForm.valid) {
  //     this.tryRegister(this.registerForm.value)
  //   } else {
  //     if (this.registerForm.get(formCtrlName).hasError('pattern')) {
  //       let regEx: RegExp = new RegExp(formCtrlName == 'phoneNumber' ? "[^0-9]" : "[^a-z,A-Z,0-9]")
  //       this.registerForm.controls[formCtrlName].setValue(this.vhAlgorithm.changeAlias(this.registerForm.controls[formCtrlName].value).replace(regEx, ''))
  //     }
  //   }
  // }

  public tryRegister(value) {
    let info = { ...value, countrycode: this.countrycode };
    this.vhComponent.showLoading("", "transparent-loading").then(() => {
      this.vhAuth.signUpOwner(value.email, value.password, this.countrycode + value.phone, info)
        .then((res) => {
          this.errorMessage = "Register for succeed";
          this.tryLogin(value)
        }, (err) => {
          console.error(err)
          this.errorMessage = 'Register no succeed';
          this.vhComponent.hideLoading(0)
        })
    })
  }

  public tryLogin(value) {
    this.vhAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(() => {
        this.vhQuerySales.refreshLocalBranchs()
          .then(() => {
            this.vhComponent.hideLoading(0)
            this.router.navigate(["/"]);
          })
      }, (error) => {
        console.log(error)
        this.errorMessage = 'wrong information';
      })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VhAuth, VhQueryCloudCam, VhQuerySales } from 'ionic-vhframeworks';
import { TranslateService } from '@ngx-translate/core';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { LanguageService } from 'src/app/services/language.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  public langList: any[] = [
    { name: 'Vietnamese', value: 'vi', img: 'assets/icon/settings/language/vi.svg' },
    { name: 'English', value: 'en', img: 'assets/icon/settings/language/en.svg' }
  ];
  colors: any[] = [
    { color: '#7F7F7F', value: 'gray-theme' },
    { color: '#880015', value: 'brown-theme' },
    { color: '#ED1B24', value: 'red-theme' },
    { color: '#FF7F26', value: 'orange-theme' },
    { color: '#FEF200', value: 'yellow-theme' },
    { color: '#23B14D', value: 'vh-theme' },
    { color: '#00A3E8', value: 'sky-theme' },
    { color: '#3F47CC', value: 'blue-theme' },
    { color: '#A349A3', value: 'purple-theme' }
  ]
  colorActive: any = this.colors.filter(item => item.value == localStorage.getItem("vh_theme"))[0];
  public lang: string = localStorage.getItem("vhsecuritycam-language");
  constructor(
    private router: Router,
    private translateService: TranslateService,
    public vhAuth: VhAuth,
    public languageService: LanguageService,
    public vhComponent: VhComponent,
    private vhQuerySales: VhQuerySales,
    private location: Location,
    private vhQueryCloudCam: VhQueryCloudCam
  ) {
    this.removeSplash()
  }

  ngOnInit(): void {
  }
  changeColor(color) {
    this.vhComponent.changeTheme(color.value)
    this.colorActive = color
  }
  // Path
  getLastPath() {
    return this.location.path()
  }
  removeSplash() {
    let splash = document.getElementById("lottie-splash")
    if (splash) splash.remove()
  }
  public selectLang(value: string) {
    localStorage.setItem("vhsecuritycam-language", value)
    this.translateService.use(value)
  }

  logout() {
    this.vhAuth.signOut().then(() => {
      this.router.navigate(["desktop/login"]);
    }, error => {
      console.log('error', error);
    })
  }
  gotoPlayback() {
    if (this.vhAuth.checkMyPermission("enable_set_playback")) { this.router.navigate(['/playback']); }
    else this.vhComponent.showToast(2000, this.languageService.translate("You do not have this rights"));
  }
  gotoArea() {
    if (this.vhAuth.checkMyPermission("enable_set_area")) { this.router.navigate(['/area']); }
    else this.vhComponent.showToast(2000, this.languageService.translate("You do not have this rights"));
  }
  gotoUser() {
    if (this.vhAuth.checkMyPermission("enable_set_user")) { this.router.navigate(['/user']); }
    else this.vhComponent.showToast(2000, this.languageService.translate("You do not have this rights"));
  }
}

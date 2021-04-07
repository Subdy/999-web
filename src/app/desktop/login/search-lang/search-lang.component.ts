import { Component } from '@angular/core';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-lang',
  templateUrl: './search-lang.component.html',
  styleUrls: ['./search-lang.component.scss']
})
export class SearchLangComponent {
  public langList: any[] = [
    { name: 'Vietnamese', value: 'vi', img: 'assets/icon/settings/language/vi.svg' },
    { name: 'English', value: 'en', img: 'assets/icon/settings/language/en.svg' }
  ];

  public lang: string = localStorage.getItem("vhsecuritycam-language");
  constructor(private translateService: TranslateService, private vhComponent: VhComponent) { }

  public selectLang(value: string) {
    localStorage.setItem("vhsecuritycam-language", value)
    this.translateService.use(value)
  }

  cancel() {
    this.vhComponent.hideModal()
  }

}

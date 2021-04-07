import { Component, OnInit } from '@angular/core';
import { VhAlgorithm } from 'ionic-vhframeworks';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import * as countryCode from 'src/assets/data/countryCode.json';

@Component({
  selector: 'app-search-phone-code',
  templateUrl: './search-phone-code.component.html',
  styleUrls: ['./search-phone-code.component.scss']
})
export class SearchPhoneCodeComponent {
  public searchList: any[] = [];
  public codeCountry: any[] = countryCode['default']
  constructor(
    private vhComponent: VhComponent,
    public vhAlgorithm: VhAlgorithm
  ) {
    this.searchList = [... this.codeCountry]
  }

  cancel(value) {
    if (value) this.vhComponent.hideModal()
  }
  selectPhoneCode(value) {
    if (value) this.vhComponent.hideModal(value)
  }

  search(value: string) {
    let tempVal: string = value.toLowerCase();
    if (value.length)
      this.searchList = this.vhAlgorithm.searchList(tempVal, this.codeCountry, ['country', "code"])
    else this.searchList = this.codeCountry
  }
}

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translateService: TranslateService
  ) { }

  public translate(key: string) {
    let value: string
    this.translateService.get(key).subscribe(res => value = res)
    return value
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.scss']
})
export class ShowRequestComponent implements OnInit {
  @Output() public hide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() show_popup: boolean;
  isIpad: boolean = false;
  constructor(
    public translate: TranslateService,
    private platform: Platform
  ) {

  }
  ngOnInit() {
    if (this.platform.is("ipad") || this.platform.is("tablet")) {
      this.isIpad = true;
    } else if (this.platform.is("mobile") || this.platform.is("iphone")) {
      this.isIpad = false;
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VhQuery,  VhMqttService, VhAlgorithm, VhAuth, VhQueryCloudCam } from 'ionic-vhframeworks';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { MainboardService } from 'src/app/services/mainboard/mainboard.service';
import { VhComponent } from '../../vh-component/vh-component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @Input() public data: any; // dữ liệu của port nhận từ trang Overview
  public on: boolean; // trạng thái on-off
  subscription_status: Subscription;
  @Output() tryConnect: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() try_conect_again:any;
  constructor(
    private vhMqttService: VhMqttService,
    private language: LanguageService,
    public translate: TranslateService,
    private router: Router,
    private vhQueryCloudCam: VhQueryCloudCam,
    private mainboardService: MainboardService,
    private vhAlgorithm: VhAlgorithm,
    private vhAuth: VhAuth,
    private vhComponent: VhComponent
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url !== "/mobile/tabs/liveview") {
        if (this.subscription_status) this.subscription_status.unsubscribe();
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === "/mobile/tabs/liveview") {
        this.callBackStatus();
      }
    });
  }

  ngOnInit() {
    this.getIconOfComponent();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subscription_status) this.subscription_status.unsubscribe();
  }

  getIconOfComponent() {
    let icons = this.vhQueryCloudCam.getlocalIcons().filter(item => item.id_component == this.data._id);
    let functions = this.vhQueryCloudCam.getlocalFunctions().filter(item => item.id_icon == icons[0]._id);
    this.data.src  = icons[0].src ;
    this.data.name = icons[0].name;
    this.data.pin = functions[0].pin;
    this.data.iotId = this.vhQueryCloudCam.getlocalMainboard(this.data.id_mainboard).iotId;
    this.callBackStatus();
  }

  

  //điều khiển bật tắt
  controlOnOff() {
    if (this.vhAuth.checkMyPermission("enable_control_monitor_mainboard")) {
      this.on = !this.on;
      this.mainboardService.controlType1(this.on ? 1 : 0, this.data.pin.toString(), this.data.iotId.toString())
    }
    else this.vhComponent.showToast(1500, this.language.translate('You do not have this rights'))

  }


  // nhận value trả về với ptype = 5 và ko unsubcribe()
  callBackStatus() {
    this.subscription_status = this.vhMqttService.callbackTopic(this.data.iotId + '15' + this.data.pin)
      .subscribe((data) => {
        let value = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString());
        clearTimeout(timeout);
        if (!value.param.except) {
          this.on = parseInt(value.param.value) == 1 ? true : false;
        }
      })
     let timeout= setTimeout(() => {
        this.data.status = true;
      }, 5000);
  }
}

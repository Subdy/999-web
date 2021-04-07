import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VhQueryCloudCam } from 'ionic-vhframeworks';
import { MainboardService } from 'src/app/services/mainboard/mainboard.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
  @Input() public data: any; // dữ liệu của port nhận từ trang Overview
  public on: boolean; // trạng thái on-off
  status: boolean;
  constructor(
    public translate: TranslateService,
    private mainboardService: MainboardService,
    private vhQueryCloudCam: VhQueryCloudCam
  ) {
  }

  ngOnInit() {

  }
  
  controlOnOff() {
    this.on = !this.on;
    this.mainboardService.controlType4(this.on ? 1 : 0, this.data.pin, this.vhQueryCloudCam.getlocalMainboard(this.data.id_mainboard).iotId)
  }
}

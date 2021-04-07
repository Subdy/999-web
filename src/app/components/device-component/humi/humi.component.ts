import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VhQuery, VhQuerySmhome ,VhMqttService, VhAlgorithm} from 'ionic-vhframeworks';
import { Subscription } from 'rxjs';
import { MainboardService } from 'src/app/services/mainboard/mainboard.service';

@Component({
  selector: 'app-humi',
  templateUrl: './humi.component.html',
  styleUrls: ['./humi.component.scss']
})
export class HumiComponent implements OnInit {
  @Input() public data: any;
  timeinterval: any;
  public value: any= {
    param: {
      hum: '00',
      temp: '00',
    }
  }; //  giá trị callback trả về
  subscription: Subscription;
  public loading: boolean = false;
  
  constructor(
    private vhMqttService: VhMqttService,
    private vhAlgorithm: VhAlgorithm,
    private router: Router,
    private mainboardService:MainboardService,
    private vhQuerySmhome:VhQuerySmhome,
    private vhQuery:VhQuery
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url !== "/mobile/tabs/overviews") {
        if(this.timeinterval) clearInterval(this.timeinterval);
      }
    });
  }

  ngOnInit() {
    // this.getValue();
    // this.vhQuerySmhome.getMainboard(this.)
    
    this.getMainboard();
  }

  ngOnDestroy(): void {
    if(this.timeinterval) clearInterval(this.timeinterval);
  }



  getMainboard() {
    this.vhQuerySmhome.getMainboard(this.data.id_mainboard).then((mainboard: any) => {
      // 
      this.data.iotId = mainboard.iotId;
      this.loading = true;
      this.getValue();
    })
  }

  // lấy giá trị nhiệt độ - độ ẩm
  getValue() {
    if (this.data) {
      this.mainboardService.getValueType2(this.data.iotId.toString());
      this.callbackValue();
      clearInterval(this.timeinterval);
      this.timeinterval = setInterval(() => {
        if (this.data) {
          this.mainboardService.getValueType2(this.data.iotId.toString());
          this.callbackValue();
        }
      }, 30000)
    }
  }

  callbackValue(){
    let subscription:Subscription = this.vhMqttService.callbackTopic(this.data.iotId.toString() + "210").subscribe((data) => {
      let humi_temp = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString());
      if(humi_temp.param.temp != 'nan'){
        this.value =humi_temp;
      }
      subscription.unsubscribe();
      this.loading = true;
    })
  }

}

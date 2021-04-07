import { Injectable } from '@angular/core';
import { VhAlgorithm, VhAuth, VhMqttService } from 'ionic-vhframeworks';
import { Subscription } from 'rxjs';
import { VhComponent } from 'src/app/components/vh-component/vh-component';
import { LanguageService } from '../language.service';

const TIMEOUT: number = 5000;

@Injectable({
  providedIn: 'root'
})
export class MainboardService {

  constructor(
    private vhMqttService: VhMqttService,
    private vhAlgorithm: VhAlgorithm,
    private vhComponent: VhComponent,
    private languageService: LanguageService,
    private vhAuth: VhAuth
  ) { }

  /**
   * 
   * @param iotId 
   * @param timezone value time zone : 0700 => múi giờ +7
   */
  public configMainboard(iotId, timezone) {
    return new Promise((resolve) => {
      let obj = {
        type: 255,
        param: {
          utc: timezone,
          ptype: 2,
          cfgurl: this.vhAuth.getDBCloudURL(),
          cfgtoken: this.vhAuth.getToken(),
        }
      }
      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let subscription: Subscription = this.vhMqttService.callbackTopic(iotId + '2552').subscribe((data) => {
        let result = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString());
        
        clearTimeout(timeout);
        if (!result.param.except) {
          resolve(true);
        }
        else {
          resolve(false);
        }
        subscription.unsubscribe();
      })
      let timeout = setTimeout(() => {
        subscription.unsubscribe();
        resolve(false);
      }, TIMEOUT)
    })
  }

  /**
   * kiểm tra trạng thái kết nối wifi của mainboard
   * response : Promise => true || false
   */
  public isConnectWifi(iotId: string) {
    return new Promise((resolve) => {
      let obj = {
        type: 255,
        param: {
          ptype: 13
        }
      }
      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let sub: Subscription = this.vhMqttService.callbackTopic(iotId + '25513')
        .subscribe(() => {
          resolve(true);
          sub.unsubscribe();
          clearTimeout(timeout);
        })
      let timeout = setTimeout(() => {
        resolve(false);
        sub.unsubscribe();
      }, TIMEOUT);
    })
  }

  /**
   * thiết lập trạng thái khi khởi động lại thiết bị
   * response : Promise => true || false
   */
  public configStatusRole(iotId: string, pin: any, status: any) {
    return new Promise((resolve) => {
      let obj = {
        type: 255,
        param: {
          ptype: 11,
          pin: pin,
          status: status
        }
      }
      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let sub: Subscription = this.vhMqttService.callbackTopic(iotId + '25511')
        .subscribe(() => {
          resolve(true);
          sub.unsubscribe();
          clearTimeout(timeout);
        })
      let timeout = setTimeout(() => {
        resolve(false);
        sub.unsubscribe();
      }, TIMEOUT);
    })
  }



  // -------------------TYPE 1------------------
  public controlType1(state: number, pin: string, iotId: string) {
    let obj = {
      type: 1,
      param: {
        ptype: 4,
        pin: pin,
        value: state
      }
    }
    this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
  }

  /**
   * lấy trạng thái on-off-disconnect của port
   * return 1 => on | 2 => off | disconect: true || false
   * @param iotId 
   * @param pin 
   */
  public getStateType1(iotId: string, pin: string) {
    return new Promise((resolve) => {
      let obj = {
        type: 1,
        param: {
          pin: pin,
          ptype: 5
        }
      }
      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let subscription: Subscription = this.vhMqttService.callbackTopic(iotId + '15' + pin)
        .subscribe((data) => {
          let result = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString());
          resolve({ disconnect: false, value: result.param.value });
          subscription.unsubscribe();
          clearTimeout(timeout);
        })
      let timeout = setTimeout(() => {
        resolve({ disconnect: true });
        subscription.unsubscribe();
      }, TIMEOUT);
    })
  }


  // -------------------TYPE 2------------------

  public getValueType2(iotId: string) {
    let obj = {
      type: 2,
      param: {
        ptype: 1,
        pin: 1
      }
    }
    
    this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
  }


  // -------------------TYPE 3------------------

  public controlType3(iotId: string, pin: number) {
    let obj = {
      type: 3,
      param: {
        pin: pin,
        ptype: 4
      }
    }
    this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
    let subscribe: Subscription = this.vhMqttService.callbackTopic(iotId + '34' + pin).subscribe((data) => {
      subscribe.unsubscribe();
      clearTimeout(timeout);
    })
    let timeout = setTimeout(() => {
      subscribe.unsubscribe();
      this.vhComponent.showToast(2000, this.languageService.translate('Disconnect'))
    }, TIMEOUT);
  }

  public learnCommandType3(iotId: string) {
    let obj = {
      type: 3,
      param: {
        ptype: 6
      }
    }
    this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
  }

  /**
   * 
   * @param iotId 
   * @param pin 
   * response : true => thành công | false: thất bại
   */
  public deleteCommandLearnedType3(iotId: string, pin: number) {
    return new Promise((resolve) => {
      let obj = {
        type: 3,
        param: {
          ptype: 7,
          pin: pin
        }
      }
      

      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let sub: Subscription = this.vhMqttService.callbackTopic(iotId + '37' + pin).subscribe((data) => {
        let value = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString())
        sub.unsubscribe();
        if (!value.param.except) resolve(true);
        else resolve(false);
        clearTimeout(timeout);
      })
      let timeout = setTimeout(() => {
        sub.unsubscribe();
        resolve(false);
      }, TIMEOUT);
    })
  }


  //--------------------TYPE 4-----------------------



  /**
   * 
   * @param iotId 
   * @param pin 
   * response : true => thành công | false: thất bại
   */
  public controlType4(state: number, pin: string, iotId: string) {
    return new Promise((resolve) => {
      let obj = {
        type: 4,
        param: {
          ptype: 4,
          pin: pin,
          value: state
        }
      }
      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let subscribe: Subscription = this.vhMqttService.callbackTopic(iotId + '44' + pin).subscribe((data) => {
        let result = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString());
        resolve({ disconnect: false, value: result.param.value });
        subscribe.unsubscribe();
        clearTimeout(timeout);
      })
      let timeout = setTimeout(() => {
        resolve({ disconnect: true });
        subscribe.unsubscribe();
      }, TIMEOUT);
    })
  }

  public getStateType4(pin: string, iotId: string) {
    return new Promise((resolve) => {
      let obj = {
        type: 4,
        param: {
          ptype: 5,
          pin: pin,
        }
      }
      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let sub: Subscription = this.vhMqttService.callbackTopic(iotId + '45' + pin)
        .subscribe((data) => {
          let result = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString());
          resolve({ disconnect: false, value: result.param.value });
          sub.unsubscribe();
          clearTimeout(timeout);
        })
      let timeout = setTimeout(() => {
        resolve({ disconnect: true });
        sub.unsubscribe();
      }, TIMEOUT);
    })
  }

  public learnCommandType4(iotId: string) {
    let obj = {
      type: 4,
      param: {
        ptype: 6
      }
    }
    this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
  }

  public deleteCommandLearnedType4(iotId: string, pin: number) {
    return new Promise((resolve) => {
      let obj = {
        type: 4,
        param: {
          ptype: 7,
          pin: pin
        }
      }
      this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
      let sub: Subscription = this.vhMqttService.callbackTopic(iotId + '47' + pin).subscribe((data) => {
        let value = this.vhAlgorithm.convert_STRING2OBJECT(data.payload.toString());
        
        
        sub.unsubscribe();
        if (value.param.except == 0) resolve(true);
        else resolve(false);
        clearTimeout(timeout);
      })
      let timeout = setTimeout(() => {
        sub.unsubscribe();
        resolve(false);
      }, TIMEOUT);
    })
  }

  public getWarningType4(iotId: string, pin: number) {
    let obj = {
      type: 4,
      param: {
        ptype: 8,
        pin: pin
      }
    }
    this.vhMqttService.publish(iotId, this.vhAlgorithm.convert_OBJECT2STRING(obj));
  }

}

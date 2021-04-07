import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmComponent } from './alarm/alarm.component';
import { RoleComponent } from './role/role.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HumiComponent } from './humi/humi.component';



@NgModule({
  declarations: [AlarmComponent,RoleComponent, HumiComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports:[AlarmComponent,RoleComponent,HumiComponent]
})
export class DeviceComponentModule { }

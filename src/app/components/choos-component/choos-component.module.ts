import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseCameraComponent } from './choose-camera/choose-camera.component';
import { ChooseAreaComponent } from './choose-area/choose-area.component';
import { ChooseDeviceComponent } from './choose-device/choose-device.component';
import { ChooseDeviceTypeComponent } from './choose-device-type/choose-device-type.component';
import { ShowGuideComponent } from './show-guide/show-guide.component';
import { ShowPackageServiceComponent } from './show-package-service/show-package-service.component';
import { ShowFilterComponent } from './show-filter/show-filter.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShowRequestComponent } from './show-request/show-request.component';
import { VhComponent } from '../vh-component/vh-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntModule } from 'src/app/desktop/ng-zorro-ant.module';
import { PortClassificationComponent } from './port-classification/port-classification.component';




@NgModule({
  declarations: [
    ChooseCameraComponent, ChooseAreaComponent, ChooseDeviceComponent, ChooseDeviceTypeComponent,
    ShowGuideComponent, ShowPackageServiceComponent, ShowFilterComponent, ShowRequestComponent,
    ShowGuideComponent, ShowPackageServiceComponent, ShowFilterComponent, ShowRequestComponent,
    PortClassificationComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    NgZorroAntModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ShowRequestComponent],
  providers: [VhComponent]
})
export class ChooseComponentModule { }

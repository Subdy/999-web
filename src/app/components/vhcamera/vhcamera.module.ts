import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhCameraComponent, VhCamPlaybackComponent } from 'ionic-vhframeworks';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [VhCameraComponent, VhCamPlaybackComponent],
  entryComponents: [VhCameraComponent, VhCamPlaybackComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [VhCameraComponent, VhCamPlaybackComponent]
})
export class VhcameraModule { }

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VhQueryCloudCam } from 'ionic-vhframeworks';

@Component({
  selector: 'app-choose-device',
  templateUrl: './choose-device.component.html',
  styleUrls: ['./choose-device.component.scss']
})
export class ChooseDeviceComponent implements OnInit {
  listDevice:any=[];
  constructor(
    public modalController: ModalController,
    private vhQueryCloudCam:VhQueryCloudCam
  ) { }

  ngOnInit(): void {
    this.vhQueryCloudCam.refreshLocalFunctions()
    .then(()=>{
      this.listDevice = this.vhQueryCloudCam.getlocalFunctions().filter(item => !item.id_camera);
    })
  }

  dismissModal(value?){
    this.modalController.dismiss(value);
  }

}

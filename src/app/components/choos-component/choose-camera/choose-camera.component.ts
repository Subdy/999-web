import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VhQueryCloudCam } from 'ionic-vhframeworks';

@Component({
  selector: 'app-choose-camera',
  templateUrl: './choose-camera.component.html',
  styleUrls: ['./choose-camera.component.scss']
})
export class ChooseCameraComponent implements OnInit {
  public list_camera:any=this.vhQueryCloudCam.getlocalCameras();
  public id_room:any;
  constructor(
    public modalController: ModalController,
    private vhQueryCloudCam:VhQueryCloudCam
  ) { }

  ngOnInit() {
    this.vhQueryCloudCam.refreshLocalCameras().then(()=>{
      if(this.id_room)  this.list_camera = this.vhQueryCloudCam.getlocalCameras().filter(item => item.id_room == this.id_room);
      else this.list_camera =this.vhQueryCloudCam.getlocalCameras();
    })
  }

  dismissModal(value?){
    this.modalController.dismiss(value);
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VhQuery, VhQueryCloudCam } from 'ionic-vhframeworks';

@Component({
  selector: 'app-choose-area',
  templateUrl: './choose-area.component.html',
  styleUrls: ['./choose-area.component.scss']
})
export class ChooseAreaComponent implements OnInit {
  public list_area:any=this.vhQueryCloudCam.getlocalRooms();
  public id:any;
  constructor(
    private vhQueryCloudCam:VhQueryCloudCam,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.vhQueryCloudCam.refreshLocalRooms() 
    .then(()=>{
      this.list_area = this.vhQueryCloudCam.getlocalRooms();
    })
  }

  dismissModal(value?){
    this.modalController.dismiss(value);
  }

}

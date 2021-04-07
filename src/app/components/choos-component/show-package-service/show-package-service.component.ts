import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-package-service',
  templateUrl: './show-package-service.component.html',
  styleUrls: ['./show-package-service.component.scss']
})
export class ShowPackageServiceComponent implements OnInit {
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
  }

  dismissModal(value?){
    this.modalController.dismiss(value);
  }

}

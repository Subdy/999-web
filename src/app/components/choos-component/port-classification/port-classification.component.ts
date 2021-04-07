import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-port-classification',
  templateUrl: './port-classification.component.html',
  styleUrls: ['./port-classification.component.scss']
})
export class PortClassificationComponent implements OnInit {
  typeBoard;
  listRoom: any = [
    {
      type: '1',
      name: this.languageService.translate('Light'),
      icon: "/assets/icon/components/light-bulb.svg"
    },
    {
      type: '2',
      name: this.languageService.translate('Fan'),
      icon: "/assets/icon/components/fan.svg"
    },
    {
      type: '4',
      name: this.languageService.translate('Door'),
      icon: "/assets/icon/components/device-1.svg"
    },
    {
      type: '5',
      name: this.languageService.translate('Socket'),
      icon: "/assets/icon/components/sockets.svg"
    },
    {
      type: '6',
      name: this.languageService.translate('Speaker'),
      icon: "/assets/icon/components/music-speaker.svg"
    }
  ]
  constructor(
    public modalController: ModalController,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    if (this.typeBoard == 5) {
      this.listRoom = [
        {
          type: 7,
          name: this.languageService.translate('Air Conditioner'),
          icon: "/assets/icon/components/air-conditioning.svg"
        },
        {
          type: 3,
          name: 'TV',
          icon: "/assets/icon/components/tivi.svg"
        },
        {
          type: 0,
          name: this.languageService.translate('Unknown'),
          icon: "assets/icon/components/ir_command.svg"
        },
      ]
    }
  }

  dismissModal(value?) {
    this.modalController.dismiss(value);
  }
}

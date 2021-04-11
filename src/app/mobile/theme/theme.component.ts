import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  img: any = [
    { id: 1, img: '/assets/1.jpg', color: 'hulu_them' },
    { id: 2, img: '/assets/2.jpg', color: 'gray_theme' },
    { id: 3, img: '/assets/3.jpg', color: 'brown_theme' },
    { id: 4, img: '/assets/4.jpg', color: 'red_theme' },
    { id: 5, img: '/assets/5.jpg', color: 'orange_theme' },
    { id: 6, img: '/assets/6.jpg', color: 'yellow_theme' }]
  active: any;
  constructor(public service: FirebaseService) {
    this.active = this.service.getValue('hulu-img') ? this.service.getValue('hulu-img').id : 1
  }

  ngOnInit() { }

  goBack() {
    this.service.hideModal()
  }
  chooseTheme(item) {
    this.active = item.id
    this.service.setValue('hulu-img', { img: item.img, id: item.id })
    this.service.setTheme(item.color)
  }
}

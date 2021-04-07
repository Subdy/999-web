import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent {

  constructor(
    private router: Router
  ) {
    this.checkSigning()
  }

  checkSigning() {
    this.router.navigate(['/tablet/tabs'])
  }
}

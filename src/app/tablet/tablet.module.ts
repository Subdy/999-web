import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabletComponent } from './tablet.component';
import { IonicModule } from '@ionic/angular';
import { TabletRoutingModule } from './tablet-routing.module';

@NgModule({
  declarations: [TabletComponent],
  imports: [
    CommonModule,
    IonicModule,
    TabletRoutingModule
  ]
})
export class TabletModule { }

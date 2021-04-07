import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopComponent } from './desktop.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntModule } from './ng-zorro-ant.module';
import { DesktopRoutingModule } from './desktop-routing.module';

@NgModule({
  declarations: [DesktopComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntModule,
    TranslateModule,
    IonicModule,
    DesktopRoutingModule,
  ],
  exports :[CommonModule]
})
export class DesktopModule { }

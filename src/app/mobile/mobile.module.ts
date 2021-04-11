import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MobileRoutingModule } from './mobile-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeComponent } from './theme/theme.component';
import { VhComponent } from '../components/vh-component/vh-component';
import { FirebaseService } from '../service/firebase.service';
import { MusicComponent } from '../mobile/music/music.component';

@NgModule({
  declarations: [MobileComponent, ThemeComponent, MusicComponent],
  entryComponents: [ThemeComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    MobileRoutingModule,
    TranslateModule,
  ],
  providers: [FirebaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class MobileModule { }

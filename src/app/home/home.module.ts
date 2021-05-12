import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntModule } from '../ng-zorro-ant.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ThemeComponent } from './theme/theme.component';
import { FirebaseService } from '../service/firebase.service';
import { MusicComponent } from './music/music.component';
import { LetterComponent } from './letter/letter.component';
import { AdbooksComponent } from './adbooks/adbooks.component';

@NgModule({
  declarations: [HomeComponent, ThemeComponent, MusicComponent, LetterComponent,AdbooksComponent],
  entryComponents: [ThemeComponent,AdbooksComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntModule,
    HomeRoutingModule,
    TranslateModule,
    IonicModule,
  ],
  providers: [FirebaseService]
})
export class HomeModule { }

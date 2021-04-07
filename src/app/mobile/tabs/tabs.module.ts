import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs.component';

import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      // {
      //   path: 'liveview',
      //   loadChildren: () => import('../live-stream/live-stream.module').then(m => m.LiveStreamModule)
      // },
      // {
      //   path: 'play-back',
      //   loadChildren: () => import('../play-back/play-back.module').then(m => m.PlayBackModule)
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      // },
      // {
      //   path: '',
      //   redirectTo: 'liveview',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [TabsComponent]
})
export class TabsModule { }
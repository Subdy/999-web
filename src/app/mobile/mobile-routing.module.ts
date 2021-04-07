import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileComponent } from './mobile.component';

const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
    children: [
      // {
      //   path: 'tabs',
      //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule)
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      // },
      // {
      //   path: 'liveview',
      //   loadChildren: () => import('./live-stream/live-stream.module').then(m => m.LiveStreamModule)
      // },
      // {
      //   path: 'play-back',
      //   loadChildren: () => import('./play-back/play-back.module').then(m => m.PlayBackModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdbooksComponent } from './adbooks/adbooks.component';

import { MobileComponent } from './mobile.component';
import { MusicComponent } from './music/music.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
  },
  {
    path: 'table',
    loadChildren: () => import('./table/table.module').then(m => m.TableModule)
  },
  {
    path: 'music',
    component: MusicComponent,
  },
  {
    path: 'theme',
    component: ThemeComponent,
  },
  {
    path: 'book',
    component: AdbooksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }

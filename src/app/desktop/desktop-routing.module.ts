import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesktopComponent } from './desktop.component';

const routes: Routes = [
    {
        path: '',
        component: DesktopComponent,
        children: [
            // {
            //     path: '',
            //     redirectTo: 'liveview', pathMatch: 'full'
            // },
            // {
            //     path: 'liveview',
            //     loadChildren: () => import('./liveview/liveview.module').then(m => m.LiveviewModule)
            // },
            // {
            //     path: 'playback',
            //     loadChildren: () => import('./playback/playback.module').then(m => m.PlaybackModule)
            // },
            // {
            //     path: 'area',
            //     loadChildren: () => import('./settings/area/area.module').then(m => m.AreaModule)
            // },
            // {
            //     path: 'user',
            //     loadChildren: () => import('./settings/user-management/user-management.module').then(m => m.UserManagementModule)
            // },
        ]
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DesktopRoutingModule { }
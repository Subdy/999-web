import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LetterComponent } from './letter/letter.component';
import { MusicComponent } from './music/music.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./table/table.module').then(m => m.TableModule)
            },
            {
                path: 'music',
                component: MusicComponent
            },
            {
                path: 'letter',
                component: LetterComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
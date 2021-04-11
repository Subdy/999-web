import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LetterComponent } from './letter/letter.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
  {
    path: 'letter',
    component: LetterComponent,
  },
];

@NgModule({
  declarations: [TableComponent, LetterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class TableModule { }

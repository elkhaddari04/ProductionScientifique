import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChercheurComponent } from './chercheur/chercheur.component';
import { DoctorantsComponent } from './doctorants/doctorants.component';
import { ProfComponent } from './prof/prof.component';

const routes: Routes = [
  {
    path: '',
    component: ChercheurComponent,
    children: [
      {
        path: 'Prof',
        component: ProfComponent,
      },
      {
        path: 'doctorant',
        component: DoctorantsComponent,
      },
      { path: '', redirectTo: 'Prof', pathMatch: 'full' },
      { path: '**', redirectTo: 'Prof', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChercheurRoutingModule { }

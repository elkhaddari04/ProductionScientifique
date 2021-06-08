import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
 import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChercheurRoutingModule } from './chercheur-routing.module';
import { ProfComponent } from './prof/prof.component';
import { DoctorantsComponent } from './doctorants/doctorants.component';
import { DeleteDoctorModalComponent } from './doctorants/components/delete-doctor-modal/delete-doctor-modal.component';
import { EditDoctorModalComponent } from './doctorants/components/edit-doctor-modal/edit-doctor-modal.component';
import { EditProfModalComponent } from './prof/components/edit-prof-modal/edit-prof-modal.component';
import { DeleteProfModalComponent } from './prof/components/delete-prof-modal/delete-prof-modal.component';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ChercheurComponent } from './chercheur/chercheur.component';


@NgModule({
  declarations: [ProfComponent, DoctorantsComponent, DeleteDoctorModalComponent, EditDoctorModalComponent, EditProfModalComponent, DeleteProfModalComponent, ChercheurComponent],
  imports: [
    CommonModule,
    ChercheurRoutingModule,
     HttpClientModule,
     FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule

  ] , 
   entryComponents: [
    DeleteProfModalComponent,
     EditProfModalComponent,
 
  ]
})
export class ChercheurModule { }

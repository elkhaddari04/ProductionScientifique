import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Doctorant } from '../../../../chercheur/_models/Doctorant.model';
import { DoctorantService } from '../../../../chercheur/_services';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';

const EMPTY_CUSTOMER: Doctorant = {
  id: undefined,
  nom: '',
  prenom: '',
  status: '',
  intitule_de_la_these: '',
  directeur: '',
  co_directeur: '',
  datesoutenance: '',

 };

@Component({
  selector: 'app-edit-doctor-modal',
  templateUrl: './edit-doctor-modal.component.html',
  styleUrls: ['./edit-doctor-modal.component.scss'] ,
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class EditDoctorModalComponent implements OnInit {

  @Input() id: number;
  isLoading$;
  professeur: Doctorant;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private DoctorantService: DoctorantService,
    private fb: FormBuilder, public modal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.isLoading$ =  this.DoctorantService.isLoading$;
    this.loadCustomer();
  }

  loadCustomer() {
    if (!this.id) {
        this.professeur = EMPTY_CUSTOMER;
      this.loadForm();
    } else {
      const sb =  this.DoctorantService.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_CUSTOMER);
        })
      ).subscribe((customer: Doctorant) => {
          this.professeur = customer;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nom: [this.professeur.nom, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      prenom: [this.professeur.prenom, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      status: [this.professeur.status, Validators.compose([Validators.required])],
      intitule_de_la_these: [this.professeur.intitule_de_la_these, Validators.compose([ ])],
      directeur: [this.professeur.directeur, Validators.compose([ ])],
      co_directeur: [this.professeur.co_directeur, Validators.compose([ ])],
      datesoutenance: [this.professeur.datesoutenance, Validators.compose([ ])],

    });
  }

  save() {
    this.prepareCustomer();
    if (this.professeur.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate =  this.DoctorantService.update(this.professeur).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.professeur);
      }),
    ).subscribe(res =>   this.professeur = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate =  this.DoctorantService.create(this.professeur).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.professeur);
      }),
    ).subscribe((res: Doctorant) =>   this.professeur = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareCustomer() {
    const formData = this.formGroup.value;
     this.professeur.nom =  formData.nom;
      this.professeur.prenom = formData.prenom;
      this.professeur.status = formData.status;
      this.professeur.intitule_de_la_these = formData.intitule_de_la_these;
      this.professeur.directeur = formData.directeur;
      this.professeur.co_directeur = formData.co_directeur;
      this.professeur.datesoutenance = formData.datesoutenance;
   }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}

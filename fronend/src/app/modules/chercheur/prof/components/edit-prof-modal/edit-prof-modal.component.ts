import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Professeur } from '../../../../chercheur/_models/Professeur.model';
import { CustomersService } from '../../../../chercheur/_services';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';

const EMPTY_CUSTOMER: Professeur = {
  id: undefined,
  nom: '',
  prenom: '',
  grade: '',
  etablissement: '',
  specialite: '',
 };

@Component({
  selector: 'app-edit-prof-modal',
  templateUrl: './edit-prof-modal.component.html',
  styleUrls: ['./edit-prof-modal.component.scss'] ,
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditProfModalComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  professeur: Professeur;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder, public modal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.isLoading$ =  this.customersService.isLoading$;
    this.loadCustomer();
  }

  loadCustomer() {
    if (!this.id) {
        this.professeur = EMPTY_CUSTOMER;
      this.loadForm();
    } else {
      const sb =  this.customersService.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_CUSTOMER);
        })
      ).subscribe((customer: Professeur) => {
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
      grade: [this.professeur.grade, Validators.compose([Validators.required])],
      etablissement: [this.professeur.etablissement, Validators.compose([ ])],
      specialite: [this.professeur.specialite, Validators.compose([ ])],
 
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
    const sbUpdate =  this.customersService.update(this.professeur).pipe(
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
    const sbCreate =  this.customersService.create(this.professeur).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.professeur);
      }),
    ).subscribe((res: Professeur) =>   this.professeur = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareCustomer() {
    const formData = this.formGroup.value;
     this.professeur.nom =  formData.nom;
      this.professeur.prenom = formData.prenom;
      this.professeur.grade = formData.grade;
      this.professeur.etablissement = formData.etablissement;
      this.professeur.specialite = formData.specialite;
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

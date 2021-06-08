import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { DoctorantService } from '../../../_services';

@Component({
  selector: 'app-delete-doctor-modal',
  templateUrl: './delete-doctor-modal.component.html',
  styleUrls: ['./delete-doctor-modal.component.scss']
})
export class DeleteDoctorModalComponent implements OnInit {

  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private DoctorantService: DoctorantService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteCustomer() {
    this.isLoading = true;
    const sb = this.DoctorantService.delete(this.id).pipe(
      delay(1000), // Remove it from your code (just for showing loading)
      tap(() => this.modal.close()),
      catchError((err) => {
        this.modal.dismiss(err);
        return of(undefined);
      }),
      finalize(() => {
        this.isLoading = false; 
      })
    ).subscribe();
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}

import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITableState, TableResponseModel, TableService } from '../../../_metronic/shared/crud-table';
import { Professeur  } from '../_models/Professeur.model';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends TableService<Professeur> implements OnDestroy {
  API_URL = `${environment.apiUrl}/api/prof`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }


  // Private fields
 
  
 
 
 



  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


    
  // READ
  find(tableState: ITableState): Observable<TableResponseModel<Professeur>> {
    
    return this.http.get<Professeur[]>(`${this.API_URL}/all` ).pipe(
      map((response: Professeur[]) => {
         const result: TableResponseModel<Professeur> = {
          items: response,
          total: 20
        };
        return result;
      })
    );
  }

    // CREATE
  // server should return the object with ID
  create(item: Professeur): Observable<Professeur> {
     return this.http.post<Professeur>(`${this.API_URL}/add`, item).pipe(
      catchError(err => {
         console.error('CREATE ITEM', err);
        return of({ id: undefined });
      }),
     );
  }




}

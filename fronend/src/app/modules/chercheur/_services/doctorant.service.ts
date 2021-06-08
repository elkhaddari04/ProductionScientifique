import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITableState, TableResponseModel, TableService } from '../../../_metronic/shared/crud-table';
import { Doctorant  } from '../_models/Doctorant.model';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorantService extends TableService<Doctorant> implements OnDestroy {
  API_URL = `${environment.apiUrl}/api/doctorant`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }


  // Private fields


  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


    
  // READ
  find(tableState: ITableState): Observable<TableResponseModel<Doctorant>> {
    
    return this.http.get<Doctorant[]>(`${this.API_URL}/all` ).pipe(
      map((response: Doctorant[]) => {
         const result: TableResponseModel<Doctorant> = {
          items: response,
          total: 20
        };
        return result;
      })
    );
  }

    // CREATE
  // server should return the object with ID
  create(item: Doctorant): Observable<Doctorant> {
     return this.http.post<Doctorant>(`${this.API_URL}/add`, item).pipe(
      catchError(err => {
         console.error('CREATE ITEM', err);
        return of({ id: undefined });
      }),
     );
  }




}

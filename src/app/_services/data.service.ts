import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataFindResponse } from '../_models/DataFindResponse';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  dataFind(compact: boolean = true, condition: any = {}): Observable<DataFindResponse> {
    return this.http.post<DataFindResponse>(`http://dms.whoknows.ir/data/find`, { compact, condition });
      // .pipe(retry(3));
  }
}

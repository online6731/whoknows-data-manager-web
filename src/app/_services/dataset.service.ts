import { Injectable } from '@angular/core';
import { DatasetFindResponse } from '../_models/DatasetFindResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(
    private http: HttpClient
  ) { }

  datasetFind(compact: boolean = false, condition: any = {}): Observable<DatasetFindResponse> {
    return this.http.post<DatasetFindResponse>(`http://dms.whoknows.ir/dataset/find`, { compact, condition });
  }

}

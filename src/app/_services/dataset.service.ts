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
    return this.http.post<DatasetFindResponse>(`https://whoknows-data-manager-server.liara.run/dataset/find`, { compact, condition });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceFindResponse } from '../_models/ResourceFindResponse';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(
    private http: HttpClient,
  ) { }

  resourceFind(compact: boolean = false, condition: any = {}): Observable<ResourceFindResponse> {
    return this.http.post<ResourceFindResponse>(`http://dms.whoknows.ir/resource/find`, { compact, condition });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResourceFindResponse } from '../_models/ResourceFindResponse';
import { ResourceTestResponse } from '../_models/ResourceTestResponse';
import { Resource } from '../_models/Resource';
import { ResourceGenerateResponse } from '../_models/ResourceGenerateResponse';

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

  resourceTest(resource: Resource): Observable<ResourceTestResponse> {
    return this.http.post<ResourceTestResponse>(`http://dms.whoknows.ir/resource/test`, { resource });
  }

  resourceGenerate(resource: Resource): Observable<ResourceGenerateResponse> {
    return this.http.post<ResourceGenerateResponse>(`http://dms.whoknows.ir/resource/generate`, { resource });
  }

}

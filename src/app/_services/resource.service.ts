import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceFindResponse } from '../_models/ResourceFindResponse';
import { ResourceTestResponse } from '../_models/ResourceTestResponse';
import { Resource } from '../_models/Resource';
import { ResourceGenerateResponse } from '../_models/ResourceGenerateResponse';
import { ResourceDataDumpResponse } from '../_models/ResourceDataDumpResponse';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(
    private http: HttpClient,
  ) { }

  resourceFind(compact: boolean = false, condition: any = {}): Observable<ResourceFindResponse> {
    return this.http.post<ResourceFindResponse>(`https://whoknows-data-manager-server.liara.run/resource/find`, { compact, condition });
  }

  resourceTest(resource: Resource): Observable<ResourceTestResponse> {
    return this.http.post<ResourceTestResponse>(`https://whoknows-data-manager-server.liara.run/resource/test`, { resource });
  }

  resourceGenerate(resource: Resource): Observable<ResourceGenerateResponse> {
    return this.http.post<ResourceGenerateResponse>(`https://whoknows-data-manager-server.liara.run/resource/generate`, { resource });
  }

  resourceDataDump(resource: Resource): Observable<ResourceDataDumpResponse> {
    return this.http.post<ResourceDataDumpResponse>(`https://whoknows-data-manager-server.liara.run/resource/data_dump`, { resource });
  }

}

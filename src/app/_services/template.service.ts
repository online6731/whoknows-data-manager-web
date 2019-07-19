import { Injectable } from '@angular/core';
import { TemplateFindResponse } from '../_models/TemplateFindResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateNewResponse } from '../_models/TemplateNewResponse';
import { TemplateTestResponse } from '../_models/TemplateTestResponse';
import { Template } from '../_models/Template';
@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private http: HttpClient
  ) { }

  templateFind(compact: boolean = false, condition: any = {}): Observable<TemplateFindResponse> {
    return this.http.post<TemplateFindResponse>(`http://tms.whoknows.ir/template/find`, { compact, condition });
  }
  templateNew(): Observable<TemplateNewResponse> {
    return this.http.post<TemplateNewResponse>(`http://tms.whoknows.ir/template/new`, { idea: 'idea of template' });
  }
  templateTest(template: Template): Observable<TemplateTestResponse> {
    return this.http.post<TemplateTestResponse>(`http://tms.whoknows.ir/template/test_save`, { template });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagFindResponse } from '../_models/TagFindResponse';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private http: HttpClient
  ) { }

  tagFind(
    option: { compact: boolean; condition: any } = {
      compact: false,
      condition: {}
    }
  ): Observable<TagFindResponse> {
    return this.http.post<TagFindResponse>(
      `http://server.whoknows.ir/tag/find`,
      { compact: option.compact, condition: option.condition }
    );
  }
}

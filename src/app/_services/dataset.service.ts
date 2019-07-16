import { Injectable } from "@angular/core";
import { DatasetFindResponse } from "../_models/DatasetFindResponse";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource } from "../_models/Resource";
import { DatasetTestResponse } from "../_models/DatasetTestResponse";
import { Dataset } from "../_models/Dataset";

@Injectable({
  providedIn: "root"
})
export class DatasetService {
  constructor(private http: HttpClient) { }

  datasetFind(
    option: { compact: boolean; condition: any } = {
      compact: false,
      condition: {}
    }
  ): Observable<DatasetFindResponse> {
    return this.http.post<DatasetFindResponse>(
      `http://dms.whoknows.ir/dataset/find`,
      { compact: option.compact, condition: option.condition }
    );
  }

  datasetTest(dataset: Dataset): Observable<DatasetTestResponse> {
    return this.http.post<DatasetTestResponse>(
      `http://dms.whoknows.ir/dataset/test`,
      { dataset }
    );
  }
}

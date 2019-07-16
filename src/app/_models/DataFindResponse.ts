import { Data } from './Data';

export class DataFindResponse {
  ok: boolean;
  problems: string[];
  datas: Data[];
}

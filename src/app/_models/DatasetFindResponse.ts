import { Dataset } from './Dataset';

export class DatasetFindResponse {
  ok: boolean;
  problems: string[];
  datasets: Dataset[];
}

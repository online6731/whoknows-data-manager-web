import { Component, OnInit, Input } from '@angular/core';
import { DatasetService } from '../_services/dataset.service';
import { Dataset } from '../_models/Dataset';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.styl']
})
export class DatasetComponent implements OnInit {

  @Input()datasetName: string;
  @Input()dataset: Dataset;

  constructor(
    private datasetService: DatasetService
  ) { }

  ngOnInit() {
  }

  addField(newFieldName: string, newFieldPattern: string) {
    this.dataset.fields[newFieldName] = {
      pattern: newFieldPattern
    };
  }

  testDataset(dataset: Dataset) {
    this.datasetService.datasetTest(dataset).subscribe((body) => {
      if (body.ok) {

      } else {
        console.log(body);
      }
    });
  }
}

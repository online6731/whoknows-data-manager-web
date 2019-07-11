import { Component, OnInit } from '@angular/core';
import { Resource } from '../_models/Resource';
import { ResourceService } from '../_services/resource.service';
import { DatasetService } from '../_services/dataset.service';
import { Dataset } from '../_models/Dataset';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {

  resources: Resource[] = [];
  datasets: Dataset[] = [];

  constructor(
    private resourceService: ResourceService,
    private datasetService: DatasetService
  ) { }

  ngOnInit() {
    this.updateResources();
    this.updateDataset();
  }

  updateResources() {
    this.resourceService.resourceFind().subscribe((body) => {
      if (body.ok) {
        this.resources = body.resources;
      } else {
        console.log(body);
      }
    });
  }

  updateDataset() {
    this.datasetService.datasetFind().subscribe((body) => {
      if (body.ok) {
        this.datasets = body.datasets;
      } else {
        console.log(body);
      }
    });
  }
}

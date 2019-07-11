import { Component, OnInit } from '@angular/core';
import { Dataset } from '../_models/Dataset';
import { Resource } from '../_models/Resource';
import { DatasetService } from '../_services/dataset.service';
import { ResourceService } from '../_services/resource.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {

  resources: Resource[] = [];
  datasets: Dataset[] = [];
  currentResource: Resource;
  currentDataset: Dataset;

  constructor(
    private resourceService: ResourceService,
    private datasetService: DatasetService
  ) { }

  ngOnInit() {
    this.currentResource = new Resource();
    this.currentDataset = new Dataset();
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

  showDataset(dataset: Dataset) {
    this.currentDataset = dataset;
    this.currentResource = null;
  }

  showResource(resource: Resource) {
    this.currentDataset = null;
    this.currentResource = resource;
  }
}

import { Component, OnInit } from '@angular/core';
import { Dataset } from '../_models/Dataset';
import { Resource } from '../_models/Resource';
import { DatasetService } from '../_services/dataset.service';
import { ResourceService } from '../_services/resource.service';
import { ResourceDataDumpResponse } from '../_models/ResourceDataDumpResponse';

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
  dataDumpInfo = {
    count: -1
  };
  testStatus: string;

  newGetter = {
    name: '',
    xpath: '',
    select: '',
    replace: ['', '']
  };
  constructor(
    private resourceService: ResourceService,
    private datasetService: DatasetService
  ) { }

  ngOnInit() {
    this.newResource();
    this.updateResources();
    this.updateDataset();
    // setInterval(() => { this.dataDumpResource(this.currentResource); }, 1000);
  }

  testResource(resource: Resource) {
    this.resourceService.resourceTest(resource).subscribe((body) => {
      if (body.ok) {
        this.testStatus = body.status;
      } else {
        console.log(body);
      }
    });
  }

  dataDumpResource(resource: Resource) {
    this.resourceService.resourceDataDump(resource).subscribe((body) => {
      if (body.ok) {
        this.dataDumpInfo = body.info;
      } else {
        console.log(body);
      }
    });
  }

  newDataset() {
    this.currentDataset = new Dataset();
  }

  newResource() {
    this.currentResource = new Resource();
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

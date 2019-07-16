import { Component, OnInit } from '@angular/core';
import { Dataset } from '../_models/Dataset';
import { Resource } from '../_models/Resource';
import { DatasetService } from '../_services/dataset.service';
import { DataService } from '../_services/data.service';
import { ResourceService } from '../_services/resource.service';
import { Data } from '../_models/Data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {

  resources: Resource[] = [];
  datasets: Dataset[] = [];
  datas: Data[] = [];
  testStatus: string;
  showingItem: Data | Dataset | Resource;
  showingItemType: string;

  newGetter = {
    name: '',
    xpath: '',
    select: '',
    replace: ['', '']
  };

  constructor(
    private resourceService: ResourceService,
    private datasetService: DatasetService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.show('resource');
    this.updateResources();
    this.updateDataset();
    this.updateData();
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

  updateData() {
    this.dataService.dataFind(false).subscribe((body) => {
      if (body.ok) {
        this.datas = body.datas;
      } else {
        console.log(body);
      }
      this.updateData();
    });
  }

  show(type: string, item: Data | Dataset | Resource = null) {
    if (item == null) {
      item = type === 'data' ? new Data() : type === 'dataset' ? new Dataset() : new Resource();
    }
    this.showingItem = item;
    this.showingItemType = type;
  }

}

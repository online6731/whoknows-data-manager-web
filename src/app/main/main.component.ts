import { Component, OnInit } from '@angular/core';
import { Dataset } from '../_models/Dataset';
import { Resource } from '../_models/Resource';
import { DatasetService } from '../_services/dataset.service';
import { DataService } from '../_services/data.service';
import { ResourceService } from '../_services/resource.service';
import { Data } from '../_models/Data';
import { TemplateService } from '../_services/template.service';
import { Template } from '../_models/Template';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {

  resources: Resource[] = [];
  datasets: Dataset[] = [];
  datas: Data[] = [];
  templates: Template[] = [];
  testStatus: string;
  showingItem: Data | Dataset | Resource | Template;
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
    private dataService: DataService,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.show('resource');
    this.updateResources();
    this.updateDatasets();
    this.updateDatas();
    this.updateTemplates();
  }

  updateResources() {
    this.resourceService.resourceFind().subscribe((body) => {
      if (body.ok) {
        this.resources = body.resources;
      } else {
        console.log(body);
      }
      this.updateResources();
    });
  }

  updateDatasets() {
    this.datasetService.datasetFind().subscribe((body) => {
      if (body.ok) {
        this.datasets = body.datasets;
      } else {
        console.log(body);
      }
      this.updateDatasets();
    });
  }

  updateDatas() {
    this.dataService.dataFind(false).subscribe((body) => {
      if (body.ok) {
        this.datas = body.datas;
      } else {
        console.log(body);
      }
      this.updateDatas();
    });
  }

  updateTemplates() {
    this.templateService.templateFind().subscribe((body) => {
      if (body.ok) {
        this.templates = body.templates;
      } else {
        console.log(body);
      }
      // this.show('template', this.templates[0]);
      // this.updateTemplates();
    });

  }

  show(type: string, item: Data | Dataset | Resource | Template = null) {
    if (item == null) {
      item = type === 'data' ? new Data() : type === 'dataset' ? new Dataset() : new Resource();
    }
    this.showingItem = item;
    this.showingItemType = type;
  }

}

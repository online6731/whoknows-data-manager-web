import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../_models/Resource';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.styl']
})
export class ResourceComponent implements OnInit {

  @Input() resourceName: string;
  @Input() resource: Resource;

  constructor() { }

  ngOnInit() { }

  addGetter(
    newGetterName: string,
    newGetterXpath: string,
    newGetterSelect: string,
    newGetterReplace: string
  ) {
    this.resource.getters[newGetterName] = {
      xpath: newGetterXpath,
      select: newGetterSelect,
      replace: newGetterReplace
    };
  }

  deleteGetter(
    getterKey: string
  ) {
    delete this.resource.getters[getterKey];
  }

}

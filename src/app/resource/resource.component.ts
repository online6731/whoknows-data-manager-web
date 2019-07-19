import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../_models/Resource';
import { ResourceService } from '../_services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.styl']
})
export class ResourceComponent implements OnInit {

  @Input() resourceName: string;
  @Input() resource: Resource;

  constructor(
    private resourceService: ResourceService
  ) { }

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


  testResource(resource: Resource) {
    this.resourceService.resourceTest(resource).subscribe((body) => {
      if (body.ok) {
        // this.testStatus = body.status;
      } else {
        console.log(body);
      }
    });
  }
}

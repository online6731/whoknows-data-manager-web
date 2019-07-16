import { Component, OnInit, Input } from '@angular/core';
import { Data } from '../_models/Data';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.styl']
})
export class DataComponent implements OnInit {

  @Input()dataName: string;
  @Input()data: Data;

  constructor() { }

  ngOnInit() {
  }

}

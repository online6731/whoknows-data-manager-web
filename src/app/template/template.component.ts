import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Template } from '../_models/Template';
import { TemplateService } from '../_services/template.service';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatAutocomplete, MatChipInputEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tag } from '../_models/Tag';
import { Dataset } from '../_models/Dataset';
import { DatasetService } from '../_services/dataset.service';
import { TagService } from '../_services/tag.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.styl']
})

export class TemplateComponent implements OnInit {

  constructor(
    private templateService: TemplateService,
    private snackBar: MatSnackBar,
    private datasetService: DatasetService,
    private tagService: TagService
  ) { }

  @Input() template: Template;

  fields = [];

  allTags: Tag[] = [];
  allDatasets: Dataset[] = [];

  problems: string[] = [];

  newField = {
    type: '',
    format: '',
    section: '',
    language: '',
    content: ''
  };

  ngOnInit() {
    this.getAllDatasets();
    this.getAllTags();
  }

  ngOnChanges() {
    this.showTemplate();
    console.log(this.template.__state);
    this.problems = [];
    Object.keys(this.template.__test_info).forEach(key => {
      console.log(key);
      this.problems = this.problems.concat(this.template.__test_info[key].problems);
    });
    console.log(this.problems);
    console.log(this.template);
  }

  getAllDatasets() {
    this.datasetService.datasetFind().subscribe((body) => {
      if (body.ok) {
        this.allDatasets = body.datasets;
        console.log(body);
      } else {
        console.log(body);
      }
    });
  }

  getAllTags() {
    this.tagService.tagFind().subscribe((body) => {
      if (body.ok) {
        this.allTags = body.tags;
      } else {
        console.log(body);
      }
    });
  }

  showTemplate() {
    this.fields = [];
    Object.keys(this.template).filter((key) => key.startsWith('&&')).forEach(type => {
      Object.keys(this.template[type]).forEach(section => {
        Object.keys(this.template[type][section]).forEach(format => {
          Object.keys(this.template[type][section][format]).forEach(index => {
            this.fields.push({
              type, section, format,
              content: this.template[type][section][format][index], language: 'persian'
            });
          });
        });
      });
    });

    return this.fields;
  }

  removeFromList(list: any[], value: any) {
    if (list.indexOf(value) !== -1) {
      list.splice(list.indexOf(value), 1);
    }
  }

  addToList(list: any[], value: any) {
    list.push(value);
  }

  removeFromObject(object: any, key: any) {
    try {
      delete object[key];
    } catch (error) {
      console.error(error);
    }
  }

  addToObject(object: any, key: any, value: any) {
    object[key] = value;
  }

  addValueToTemplate(newField: any) {
    if (!(newField.type in this.template)) {
      this.template[newField.type] = {};
    }
    if (!(newField.section in this.template[newField.type])) {
      this.template[newField.type][newField.section] = {};
    }

    if (!(newField.format in this.template[newField.type][newField.section])) {
      this.template[newField.type][newField.section][newField.format] = [];
    }

    this.template[newField.type][newField.section][newField.format].push(newField.content);

    newField.type = '';
    newField.section = '';
    newField.language = '';
    newField.format = '';
    newField.content = '';

    this.ngOnChanges();
  }

  removeValueFromTemplate(newField: any) {
    try {
      delete this.template[newField.type][newField.section][newField.format];
    } catch (error) {
      console.error(error);
    }
  }

  testTemplate(template: Template) {
    this.templateService.templateTest(template).subscribe((body) => {
      if (body.ok === true) {
        console.log(body);
      } else {

      }
    });
  }
}

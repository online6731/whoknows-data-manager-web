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

  defaultField = {
    type: '&&choose',
    section: 'title',
    format: 'text',
    language: 'persian',
    content: ''
  };

  newField = { ...this.defaultField };

  ngOnInit() {
    this.fields = [];
    this.getAllDatasets();
    this.getAllTags();
  }

  ngOnChanges() {
    console.log(this.template);
    this.showTemplate();
    this.problems = [];
    Object.keys(this.template.__test_info).forEach(key => {
      this.problems = [...this.problems, ...this.template.__test_info[key].problems];
    });
  }

  sortNull() { }

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
    console.log(list);
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

  addFieldToTemplate(field: any) {
    if (!(field.type in this.template)) {
      this.template[field.type] = {};
    }

    if (!(field.section in this.template[field.type])) {
      this.template[field.type][field.section] = {};
    }

    if (!(field.format in this.template[field.type][field.section])) {
      this.template[field.type][field.section][field.format] = [];
    }

    this.template[field.type][field.section][field.format].push(field.content);

    this.newField = { ...this.defaultField };

    this.ngOnChanges();
  }

  removeFieldFromTemplate(newField: any) {
    try {
      delete this.template[newField.type][newField.section][newField.format];
    } catch (error) {
      console.error(error);
    }
  }

  testTemplate(template: Template) {
    this.templateService.templateTest(template).subscribe((body) => {
      if (body.ok === true) {
        this.template = body.template;
      } else {

      }
      console.log(this.template);
    });
  }
}

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

  @Input() template: Template;

  fields = [];
  headers = ['__idea', 'datasets', 'tags', 'usage'];


  allTags: Tag[] = [];
  allDatasets: Dataset[] = [];

  tagCtrl = new FormControl();
  datasetCtrl = new FormControl();

  filteredTags: Observable<string[]>;
  filteredDatasets: Observable<string[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];


  @ViewChild('datasetInput', { static: false }) datasetInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocompleteTag: MatAutocomplete;
  @ViewChild('auto', { static: false }) matAutocompleteDataset: MatAutocomplete;


  constructor(
    private templateService: TemplateService,
    private snackBar: MatSnackBar,
    private datasetService: DatasetService,
    private tagService: TagService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filterTags(tag) : this.allTags.map(x => x.title).slice()));

    this.filteredDatasets = this.datasetCtrl.valueChanges.pipe(
      startWith(null),
      map((dataset: string | null) => dataset ? this._filterDatasets(dataset) : this.allDatasets.map(x => x.headers.name).slice()));

  }

  ngOnInit() {
    this.showTemplate();
    this.getAllDatasets();
    this.getAllTags();
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
  }

  saveTemplate() {
    this.fields.forEach((field) => {
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
    });

  }

  removeValue(key: string) {
    delete this.template.values[key];
  }

  addValue(key: string, dataQuery: string) {
    if (key) {
      this.template.values[key] = dataQuery;
    } else {
      this.snackBar.open('key of value cant be empty', '', {
        duration: 3000,
        horizontalPosition: 'left'
      });
    }
  }

  testTemplate(template: Template) {
    this.templateService.templateTest(template).subscribe((body) => {
      if (body.ok) {
        this.template = body.template;
      } else {
        console.error(body);
      }
    });
  }

  addTag(event: MatChipInputEvent): void {

    if (!this.matAutocompleteTag.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        const tag = this.allTags.filter(x => x.title === value.trim())[0];
        this.template.tags.push(tag);
      }
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  removeTag(tag: string): void {
    const index = this.template.tags.map(x => x.title).indexOf(tag);

    if (index >= 0) {
      this.template.tags.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    const tag = this.allTags.filter(x => x.title === event.option.viewValue)[0];
    this.template.tags.push(tag);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  addDataset(event: MatChipInputEvent): void {

    if (!this.matAutocompleteDataset.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        const dataset = this.allDatasets.filter(x => x.headers.name === value.trim())[0];
        this.template.__datasets.push(dataset);
      }
      if (input) {
        input.value = '';
      }

      this.datasetCtrl.setValue(null);
    }
  }

  removeDataset(dataset: string): void {
    const index = this.template.__datasets.map(x => x.headers.name).indexOf(dataset);

    if (index >= 0) {
      this.template.__datasets.splice(index, 1);
    }
  }

  selectedDataset(event: MatAutocompleteSelectedEvent): void {
    const dataset = this.allDatasets.filter(x => x.headers.name === event.option.viewValue)[0];
    this.template.__datasets.push(dataset);
    this.datasetInput.nativeElement.value = '';
    this.datasetCtrl.setValue(null);
  }

  private _filterTags(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.map(dataset => dataset.title).filter(dataset => dataset.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterDatasets(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allDatasets.map(dataset => dataset.headers.name).filter(dataset => dataset.toLowerCase().indexOf(filterValue) === 0);
  }

}

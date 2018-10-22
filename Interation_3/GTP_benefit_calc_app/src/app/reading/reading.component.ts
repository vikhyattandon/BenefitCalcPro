import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Validators} from '@angular/forms';
import {ReadingService } from './reading.service';
import {DeviceReadingItem }  from '../shared';
import { MdCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-reading',
  viewProviders: [FormBuilder],
  templateUrl: './reading.component.html',
  providers: [ReadingService]
})

export class ReadingComponent implements OnInit {
  readings : Array<DeviceReadingItem>;
  errorMessage: string;
  showError: boolean;  
  
  fb: FormBuilder;
  myForm: FormGroup;
  macAddress: FormControl;
  infoType: FormControl;

  constructor(fb: FormBuilder, private readingService: ReadingService) {
    this.fb = fb;
    this.macAddress = new FormControl('A00001003', Validators.required);
    this.infoType = new FormControl('MOIS', Validators.required);
    this.myForm = this.fb.group({
      'macAddress': this.macAddress,
      'infoType': this.infoType
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit() called');    
    let timer = Observable.timer(2000,15000);
    timer.subscribe(t=>this.onSubmit());
  }

  private printData(testData):void {
    this.readings = testData;
    this.showError = false;
    console.log(this.readings);
    //this.myForm.reset();
  } 

  private printError(error):void {
    this.errorMessage = error;
    this.showError = true;
    console.log(this.errorMessage);    
  } 

  onSubmit(): void {
    if (this.myForm.valid) {
      this.readings = null;
      this.readingService.getDeviceReadings(this.macAddress.value, this.infoType.value)
                                  .subscribe(testData => this.printData(testData), 
                                             error =>  this.printError(<any>error));      
    }
  }  

  public clearResult():void {
    this.readings = null;
    this.errorMessage = null;        
  } 
}

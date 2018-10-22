import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Validators} from '@angular/forms';
import {AutoReadingService } from './autoreading.service';
import {DeviceReadingItem }  from '../shared';
import {MdCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-autoreading',
  viewProviders: [FormBuilder],
  templateUrl: './autoreading.component.html',
  providers: [AutoReadingService]
})

export class AutoReadingComponent implements OnInit {
  readings : Array<DeviceReadingItem>;
  allReadings : Array<DeviceReadingItem>;
  errorMessage: string;
  showError: boolean;  
  
  fb: FormBuilder;
  myForm: FormGroup;
  macAddress: FormControl;
  infoType: FormControl;

  constructor(fb: FormBuilder, private autoReadingService: AutoReadingService) {
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
    let timer = Observable.timer(2000,3000);
    timer.subscribe(t=>this.onSubmit());
  }

  private printData(testData):void {    
    this.readings = testData;
    this.allReadings = this.allReadings.concat(testData);
    
    this.allReadings.forEach(item => {
      if (item.createTs) {
         item.createTsStr = (new Date(item.createTs)).toJSON();
      }
    });

    //this.allReadings.sort();
/*
    this.allReadings.sort(function(a, b) {
      //return a.infoType > b.infoType;
      if(a.infoType < b.infoType){
          return -1;
      }else if(a.infoType > b.infoType){
          return 1;
      }
      return 0;
    }); */

    this.allReadings.sort(function mysortfunction(a, b) {

      var o1 = a.macAddress.toLowerCase();
      var o2 = b.macAddress.toLowerCase();

      var p1 = a.infoType.toLowerCase();
      var p2 = b.infoType.toLowerCase();

      if (o1 < o2) return -1;
      if (o1 > o2) return 1;
      if (p1 < p2) return -1;
      if (p1 > p2) return 1;
      return 0;
    });
    
    this.showError = false;
    console.log(this.allReadings);    
  } 

  private printError(error):void {
    this.errorMessage = error;
    this.showError = true;
    console.log(this.errorMessage);    
  } 

  onSubmit(): void {    
    let inputAutoReadings = [];
    this.allReadings = []; 
    
    inputAutoReadings.push(new DeviceReadingItem(100, "A00001003", "MOIS", 0, 0, 0, null, ""));
    inputAutoReadings.push(new DeviceReadingItem(101, "0000", "TEMP", 0, 0, 0, null, ""));
    inputAutoReadings.push(new DeviceReadingItem(100, "A00001003", "TEMP", 0, 0, 0, null, ""));
    inputAutoReadings.push(new DeviceReadingItem(101, "0000", "MOIS", 0, 0, 0, null, ""));
    inputAutoReadings.push(new DeviceReadingItem(101, "0000", "PM25", 0, 0, 0, null, ""));

    inputAutoReadings.forEach(deviceReadingItem => {  
      //this.autoReadingService.getDeviceListReadings()
      console.log(deviceReadingItem.macAddress + " - " + deviceReadingItem.infoType);
      this.autoReadingService.getDeviceReadings(deviceReadingItem.macAddress, deviceReadingItem.infoType)
                                .subscribe(testData => this.printData(testData), 
                                            error =>  this.printError(<any>error));   

    });   
    console.log("Test-1:");
    console.log(this.readings);
  }  

  public clearResult():void {
    this.readings = null;
    this.errorMessage = null;        
  } 
}

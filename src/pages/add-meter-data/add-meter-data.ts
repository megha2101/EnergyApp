import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http';
import { SourcePage } from '../source/source';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { MeterDataServiceProvider } from '../../providers/meter-data-service/meter-data-service';

@IonicPage()
@Component({
  selector: 'page-add-meter-data',
  templateUrl: 'add-meter-data.html',
})
export class AddMeterDataPage {

  myStartDate:any;// moment().format(); //To show the default date
  myEndDate: any;
  addMeterReadingForm: FormGroup;
  submitAttempt: boolean = false;
  myReading: any;
  showError: boolean = false;
  allReasons: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public datepipe: DatePipe,
  public sharedService: SharedServiceProvider, public http: Http, public configService: ConfigServiceProvider,
  public meterDataService: MeterDataServiceProvider) {
    this.addMeterReadingForm = formBuilder.group({
        startDate: [''],
        endDate: [''],
        reading: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if(this.sharedService.selMeterObj.readings.length == 0)
        {
          this.myStartDate = moment(new Date());
          this.myEndDate = moment( this.myStartDate, "MMM DD, YYYY").add(1, 'month')
          this.myStartDate = moment(new Date()).toISOString();
          this.myEndDate = this.myEndDate.toISOString();    
        }
        else
        {
          this.myStartDate = this.sharedService.selMeterObj.readings[0].end_date;
          this.myStartDate = moment( this.myStartDate, "MMM DD, YYYY").add(1, 'day');
          this.myEndDate = moment( this.myStartDate, "MMM DD, YYYY").add(1, 'month');//moment(start_date, "MMM DD, YYYY").add(1, 'month').format("MMM DD, YYYY") 
          this.myStartDate = this.myStartDate.toISOString();            
          this.myEndDate =  this.myEndDate.toISOString();
        }
    }

  submitDetails(){
     
  }

 saveMeterData(reading){  
    var validationResult = this. validateReadings(reading);
    if(!validationResult.status){
        this.showError = true;
        this.allReasons = validationResult.reason;
        return;
    }
    var putData = {
        start_date: this.datepipe.transform(this.myStartDate, 'yyyy-MM-dd'), 
        end_date:  this.datepipe.transform(this.myEndDate, 'yyyy-MM-dd'), 
        reading: this.myReading
    };
    this.meterDataService.addMeterReading(putData).subscribe((data)=>{
        data.start_date= moment(data.start_date.split('T')[0], "YYYY-MM-DD").format("MMM DD, YYYY");
        data.end_date = moment(data.end_date.split('T')[0], "YYYY-MM-DD").subtract(1, 'day').format("MMM DD, YYYY");
        this.sharedService.selMeterObj.readings.unshift(data); 
        this.navCtrl.pop();             
    },error =>{
        console.log("error in add meter reading");
    });    
       
    }
        

  validateReadings(reading)
        {
            var status = true;
            var reason = '';
            var regex = /^[0-9]*(\.[0-9]{1,6})?$/;
            
            if(isNaN((this.myReading)) || String(this.myReading).length == 0)
            {
                reason += 'Reading is not a valid number. ';
                status = false;
            }
            else if(regex.test(String(this.myReading)) == false)
            {
                reason += 'Maximum 6 decimals allowed. ';
                status = false;
            }           
            var curr_end_date = this.datepipe.transform(this.myEndDate, 'yyyy-MM-dd');
            var curr_start_date = this.datepipe.transform(this.myStartDate, 'yyyy-MM-dd');
            
            if(moment(curr_end_date).isBefore(curr_start_date))
            {
                reason += 'Current ranges of ' + String(curr_start_date) + ' - ' + String(curr_end_date) + ' are overlapping. ';
                status = false;
            }
            var meterObject ={
                
                end_date : moment(curr_end_date).format("MMM DD, YYYY"),
                start_date : moment(curr_start_date).format("MMM DD, YYYY"),
                reading : this.myReading
            }
            this.sharedService.selMeterObj.readings.unshift(meterObject);
            
            for(var i = 1; i < this.sharedService.selMeterObj.readings.length; i++)
            {
                var current_end_date = this.sharedService.selMeterObj.readings[i].end_date;
                var current_start_date = this.sharedService.selMeterObj.readings[i].start_date;
                var previous_start_date = this.sharedService.selMeterObj.readings[i - 1].start_date;
                var previous_end_date = this.sharedService.selMeterObj.readings[i - 1].end_date;
                
                if(moment(current_end_date).isBetween(previous_start_date, previous_end_date) || moment(previous_start_date).isSameOrBefore(current_end_date))
                {
                    reason += 'Range ' + String(current_start_date) + ' - ' + String(current_end_date) + ' overlaps with ' + String(previous_start_date) + ' - ' + String(previous_end_date) + '. ';
                    status = false;
                }
            }
            console.log("all reasons are: " +reason);
            return {'status': status, 'reason': reason}
        }


  save(){
    this.submitAttempt = true;
        if(!this.addMeterReadingForm.valid){      
        }
        else {        
          this.navCtrl.pop();
        }
  }



}

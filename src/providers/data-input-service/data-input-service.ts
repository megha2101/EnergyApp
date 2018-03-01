import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MeterDataServiceProvider } from '../../providers/meter-data-service/meter-data-service';
import { AsyncServiceProvider } from '../../providers/async-service/async-service';
import * as moment from 'moment';
import { SharedServiceProvider } from '../shared-service/shared-service';



@Injectable()
export class DataInputServiceProvider {

    dataInputMeters: any;
    meterData: any = [];
    energyUrls:any=[];
    items: any = [];
    meterReadings: any = [];
    response: any= [];
    mymeters : any= [];
    loadingMoreMeters: any = true;
    chartOptions1: any;
    newOption: any;
    page_size: any = 2;
    page_count: any = 1;
    
    constructor(public http: Http, public MeterDataService: MeterDataServiceProvider, private asyncService: AsyncServiceProvider,
    public sharedService: SharedServiceProvider) {
    
    }
    getNumberOfMeters(configService, projectId, config_header){

      // if(this.dataInputMeters){
      //   return Promise.resolve(this.dataInputMeters);
      // }
      
        return new Promise((resolve, reject) => {
            this.MeterDataService.getMeterData(configService, projectId, this.page_size, config_header).subscribe((data)=> {
                  this.dataInputMeters = data;
                  this.energyUrls= [];   
                  this.meterData = [];  
                  if(data.next == null)
                  {
                      //this.page_count = null;
                  }  
                  for(var i=0; i< this.dataInputMeters.results.length; i++){  
                      this.dataInputMeters.results[i]['readings'] = [];   
                      this.meterData.push(this.dataInputMeters.results[i]); 
                      this.energyUrls.push(configService.basic_api_url + '/assets/LEED:'+ projectId +'/meters/ID:' + this.dataInputMeters.results[i].id + '/consumption/?page_size=12');
              
                  }  
                  this.asyncService.asyncServFunc(this.energyUrls, config_header).subscribe((data1)=> {
                      this.meterReadings = data1;
                      for(var i = 0; i < this.dataInputMeters["results"].length; i++) {
                          var meter_id = this.dataInputMeters["results"][i].id;
                          for(var j = 0; j < this.meterReadings.length; j++){
                              var meter_id_response = this.energyUrls[j].split('/ID:')[this.energyUrls[j].split('/ID:').length - 1].split('/')[0];
                              if(meter_id_response == meter_id)
                                  {   
                                      for(var x = 0; x < this.meterReadings[j].results.length; x++)
                                      {
                                          this.meterReadings[j].results[x].start_date = moment(this.meterReadings[j]['results'][x].start_date.split('T')[0]).format("MMM DD, YYYY");  
                                          this.meterReadings[j].results[x].end_date = moment(this.meterReadings[j]['results'][x].end_date.split('T')[0]).subtract(1, 'day').format("MMM DD, YYYY"); 
                                      }
                                      this.dataInputMeters["results"][i]['readings'] = this.meterReadings[j].results;
                                  }
                          }
                          if(this.dataInputMeters["results"][i].fuel_type.kind.toLowerCase() == 'electricity')
                          {
                              if(this.dataInputMeters["results"][i].fuel_type.id != 46)
                              {
                                  this.dataInputMeters["results"][i].fuel_type.type = 'Purchased from Grid'
                              }
                          }
                                
                          var partner_id = isNaN(this.dataInputMeters["results"].partner_meter_id) ? 0 : parseInt(this.dataInputMeters["results"].partner_meter_id)
                          
                          if(partner_id > 0)
                          {
                            this.dataInputMeters["results"][i]['energystar'] = true;
                          }
                          else
                          {
                            this.dataInputMeters["results"][i]['energystar'] = false;
                          }
                          }

                      this.sharedService.mymeters = this.dataInputMeters.results;
                      for(var i = 0; i< this.sharedService.mymeters.length; i++){
                          this.sharedService.mymetersArray.push(this.sharedService.mymeters[i]);
                      }
                      //$scope.$emit('ngRepeatFinish');
                      this.loadingMoreMeters = false;    
                        resolve(this.dataInputMeters);
                      }, (error) => {
                          reject(error);   
                          
                      
                  });        
            });
        });
    }
}






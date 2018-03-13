import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { SharedServiceProvider } from '../shared-service/shared-service';
import { ConfigServiceProvider } from '../config-service/config-service';


@Injectable()
export class MeterDataServiceProvider {

  projectID: any ;

  constructor(public http: Http, public sharedService: SharedServiceProvider, public configService: ConfigServiceProvider) {
   
  }

   
  getMeterData(configService, projectId, page_size, config_header, page_count){
      var meter_data_path = configService.basic_api_url + '/assets/LEED:'+ projectId +'/meters/?page_size='+ page_size + '&page=' + page_count + '&kind=energy';
      return this.http.get(meter_data_path, config_header).map(res => res.json());
  }

  createMeter(configService, config_header, projectId, postData){
      return this.http.post(configService.basic_api_url + '/assets/LEED:'+ projectId +'/meters/', postData, config_header).map(res => res.json());
  }

  addMeterReading(putData){
      return this.http.post(this.configService.basic_api_url + '/assets/LEED:'+this.sharedService.selBuildObject.leed_id+'/meters/ID:'+this.sharedService.selMeterObj.id+'/consumption/?recompute_score=1', putData, this.sharedService.config_header_new).map(res=>res.json());
  }

  deleteMeterReading(meterReading, custom_basic_config_header){
    
    return  this.http.delete(this.configService.basic_api_url + '/assets/LEED:'+ this.sharedService.selBuildObject.leed_id +'/meters/ID:'+this.sharedService.selMeterObj.id+'/consumption/ID:'+meterReading.id+'/?recompute_score=1', custom_basic_config_header).map(res=>res.json());
  }
  
  
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class MeterDataServiceProvider {

  projectID: any ;

  constructor(public http: Http) {
   
  }

   
  getMeterData(configService, projectId, page_size, config_header){
      var meter_data_path = configService.basic_api_url + '/assets/LEED:'+ projectId +'/meters/?page_size='+ page_size + '&kind=energy';
      return this.http.get(meter_data_path, config_header).map(res => res.json());
  }
  
}

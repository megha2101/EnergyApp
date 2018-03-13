import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigServiceProvider } from '../config-service/config-service';
import { SharedServiceProvider } from '../shared-service/shared-service';

@Injectable()
export class GeoServiceProvider {

  constructor(public http: Http, public configService: ConfigServiceProvider, public sharedService: SharedServiceProvider) {
    
  }
    getCountryStates(){                
      var country_state_path = this.configService.basic_api_url + '/country/states/';
      return this.http.get(country_state_path, this.sharedService.config_header_new).map(res=>res.json());
    }
}

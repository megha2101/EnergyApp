import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigServiceProvider } from '../config-service/config-service';
import { SharedServiceProvider } from '../shared-service/shared-service';

@Injectable()
export class RegistrationServiceProvider {

  constructor(public http: Http, public configService: ConfigServiceProvider, public sharedService: SharedServiceProvider) {
    console.log('Hello RegistrationServiceProvider Provider');
  }

  getOrganizations(query){
    return this.http.get(this.configService.basic_api_url + '/assets/searchowner/?q=' + query,this.sharedService.config_header_new).map(res => res.json());
  }

  createNewOwnerOrganization(postData){
    return this.http.post(this.configService.basic_api_url + '/assets/searchowner/', postData, this.sharedService.config_header_new).map(res => res.json());
  }

  

}

import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigServiceProvider } from '../config-service/config-service';
import { SharedServiceProvider } from '../shared-service/shared-service';

@Injectable()
export class ValidationServiceProvider {

  constructor(public http: Http,public configService: ConfigServiceProvider, public sharedService: SharedServiceProvider) {
  }
   
  
  validateOrganization(org_name, org_full_country) {                
      var data = {
          "sdn_type" : "organization",
          "organization_name" : org_name,
          "organization_country" : org_full_country
      } 
      var validation_path = this.configService.basic_api_url + '/organization/validate/';      
      return this.http.post(validation_path, data, this.sharedService.config_header_new).map(res =>res.json());
   };

    validateOwner(user_name, org_full_country) {                
        var data = {
            "sdn_type" : "person",
            "user_name" : user_name,
            "organization_country" : org_full_country
        } 

        var validation_path = this.configService.basic_api_url + '/organization/validate/';
        
        return this.http.post(validation_path, data, this.sharedService.config_header_new).map(res =>res.json());
    };
  }




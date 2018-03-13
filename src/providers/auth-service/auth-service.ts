import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigServiceProvider } from '../config-service/config-service';
import { SharedServiceProvider } from '../shared-service/shared-service';

@Injectable()
export class AuthServiceProvider {
  

    constructor(public http: Http, public configService:ConfigServiceProvider, public sharedService: SharedServiceProvider) {
        
    }

    getAuth(){                
        return this.http.get(this.configService.basic_api_url+'/auth/access/', this.sharedService.config_header_new).map(res => res.json());       
    }

}

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ConfigServiceProvider } from '../config-service/config-service';

@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http, public configService: ConfigServiceProvider) {
    
  }
  getLogin(data,config_header){
     return this.http.post(this.configService.basic_api_url + '/auth/login/', data, config_header).
     map(res => res.json()); 

  }

}

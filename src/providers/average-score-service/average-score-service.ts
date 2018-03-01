import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SharedServiceProvider } from '../shared-service/shared-service';
import { AsyncServiceProvider } from '../async-service/async-service';

@Injectable()
export class AverageScoreServiceProvider {
    url: any ;
    constructor(public http: Http, public sharedService: SharedServiceProvider, public asyncService: AsyncServiceProvider) {
      
    }

    getGloablAverageScore(configService, config_header){
      return this.http.get(configService.basic_api_url +'/comparables/', config_header).map(res => res.json());
    }

    getLocalAverageScore(configService, config_header){
      return this.http.get(configService.basic_api_url +'/comparables/?state=' + this.sharedService.selBuildObject.country + 
      this.sharedService.selBuildObject.state, config_header).map(res => res.json());
    }

    getAverageScore(configService, config_header){
      this.url = configService.basic_api_url +'/comparables/';
      this.url += ',' + configService.basic_api_url +'/comparables/?state=' + this.sharedService.selBuildObject.country + this.sharedService.selBuildObject.state;
      this.url = this.url.split(',');                  
      return this.asyncService.asyncServFunc(this.url, config_header);

    }

}


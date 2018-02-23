import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildingProjectServiceProvider {

    constructor(public http: Http) {
      
    }

    getBuildingData(configService, config_header){
       return this.http.get(configService.basic_api_url + '/assets/', config_header).map(res => res.json()); 
    }

}


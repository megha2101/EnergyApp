import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildingProjectServiceProvider {
    projectList: any;
    constructor(public http: Http) {
      
    }

    getBuildingData(configService, config_header, nextPageUrl){
        this.projectList = this.http.get(configService.basic_api_url + '/assets/'+'?page_size=50&project_type=building&page='+nextPageUrl, config_header).map(res => res.json());
        return  this.projectList;
    }

    getBuildingData1(configService, config_header){
      return this.http.get(configService.basic_api_url + '/assets/', config_header).map(res => res.json()); 
   }

   

}


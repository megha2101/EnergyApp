import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildingProjectServiceProvider {

    constructor(public http: Http) {
      
    }

    getBuildingData(){
       return this.http.get("assets/json-v2/myAllProject.json").map(res => res.json()); 
    }

}


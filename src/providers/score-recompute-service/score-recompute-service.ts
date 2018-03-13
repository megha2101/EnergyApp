import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigServiceProvider } from '../config-service/config-service';
import { SharedServiceProvider } from '../shared-service/shared-service';

@Injectable()
export class ScoreRecomputeServiceProvider {

    constructor(public http: Http, public configService: ConfigServiceProvider, public sharedService: SharedServiceProvider) {
      
    }

    scoreRecompute(){                          
      let recompute_path = this.configService.basic_api_url + '/assets/LEED:' + this.sharedService.selBuildObject.leed_id + '/analysis/recompute/';
      return this.http.get(recompute_path, this.sharedService.config_header_new).map(res => res.json());       
    }

}

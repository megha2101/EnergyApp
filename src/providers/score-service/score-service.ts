import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ScoreServiceProvider {

  constructor(public http: Http) {
    
  }
  //https://api.usgbc.org/arc/data/dev/assets/LEED:{building__leed_id}/scores/
  getScore(configService, config_header, buildingId){
      return this.http.get(configService.basic_api_url + '/assets/'+'LEED:'+buildingId+'/scores/', config_header).map(res => res.json());
  }

}



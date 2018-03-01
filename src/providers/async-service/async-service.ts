import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AsyncServiceProvider {

  constructor(public http: Http) {
    
  }

  asyncServFunc(energyUrls, config_header){
      return Observable.forkJoin(
      energyUrls.map(
          i => this.http.get(i, config_header)
              .map(res => res.json())
      ));   
  }

}
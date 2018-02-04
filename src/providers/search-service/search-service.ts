import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SearchServiceProvider {

  constructor(public http: Http) {
    console.log('Hello SearchServiceProvider Provider');
  }

  items: any = [];
  results: any = [];

  filterItems(ev: any, items){  
    let val = (ev.target.value);
      return items.filter((item) => {
          return ((item.name.toLowerCase().indexOf(val.toLowerCase()) > -1));                   
    });   
  }

}

//          return ((item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)||(item.leed_id.toString().indexOf(val) > -1));
//||(item.pf_id.toString().indexOf(val) > -1
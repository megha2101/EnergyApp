import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedServiceProvider {

  sharedAllProjects: any = [];
  myNewProject: string;
  stateValue: string;
  countryValue:string;
  basicInformation: string;
  sharedAllProjectsNew: any = [];

  constructor(public http: HttpClient) {
    
  }

  check_value_null(value){
    if(isNaN(value)){
      return 0;
    }else{
      return value;
    }
  }

}

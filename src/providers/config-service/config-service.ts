import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ConfigServiceProvider {

    ENV_FLAG          : any = "DEV";
    subscription_key  : any;
    basic_api_url     : any;
    env               : string;
    config_header     : any ;
    authToken         : any;


    constructor (public http: Http) {
        this.getVariables(this.ENV_FLAG);
    }

    getVariables(env){
        if(env = "DEV"){
          this.basic_api_url =  'https://api.usgbc.org/dev/leed';
          this.subscription_key = '450fc0393ae747638659258f5ed26485';                     
        }else{
            console.log(env);
        }

    }
    

}

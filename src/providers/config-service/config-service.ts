import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ConfigServiceProvider {

    ENV_FLAG          : any = "STG";
    subscription_key  : any;
    basic_api_url     : any;
    env               : string;
    config_header     : any ;
    authToken         : any;
    rating_systems    : any;
    registration_agreement : any = '../../../assets/pdf/registration_agreement.htm';
    addendum_agreement     : any = '../../../assets/pdf/registration_agreement.htm'

    constructor (public http: Http) {
      this.getVariables(this.ENV_FLAG);
    }

    getVariables(env){
        if(env == "DEV"){
            this.basic_api_url =  'https://api.usgbc.org/dev/leed';
            this.subscription_key = '450fc0393ae747638659258f5ed26485';   
            this.rating_systems =  {
                building: 'LEED V4 O+M: EB WP',
                city: 'LEED-CT',
                community: 'LEED-CM',
                district: 'LEED-DT',
                neighborhood: 'LEED-NB',
                transit: 'LEED V4 O+M: TR',
                parksmart: 'PARKSMART',
                sites: 'SITES'
            }                  
        }else if(env == "STG"){
          this.basic_api_url =  'https://api.usgbc.org/stg/leed';
          this.subscription_key = '8e0baacec376430ba0f81a5d960ccbb0';  
          this.rating_systems =  {
            building: 'LEED V4 O+M: EB WP',
            city: 'LEED-CT',
            community: 'LEED-CM',
            district: 'LEED-DT',
            neighborhood: 'LEED-NB',
            transit: 'LEED V4 O+M: TR',
            parksmart: 'PARKSMART',
            sites: 'SITES'
        }   
        }else{
          console.log("no environment selected");
        }

    }
    

}

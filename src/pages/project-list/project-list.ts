import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import * as $ from 'jquery';
import {  LoginPage } from '../login/login';

//Providers
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { BuildingProjectServiceProvider } from '../../providers/building-project-service/building-project-service';
import { SearchServiceProvider } from '../../providers/search-service/search-service';
import { ProjectDetailsPage } from '../project-details/project-details';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { empty } from 'rxjs/Observer';


@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {

  myAllProjects: any = [];
  allProjects: any = [];
  pageno: any = 1;
  nextValueFlag: boolean = true;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public buildingService: BuildingProjectServiceProvider, 
  public SharedService: SharedServiceProvider, public SearchService: SearchServiceProvider, public configService: ConfigServiceProvider) {
  }
  config_header = 
                {
                    headers: 
                    {
                        "Content-Type": "application/json",
                        "Ocp-Apim-Subscription-Key": this.configService.subscription_key,
                        "Authorization": "Bearer " + this.configService.authToken
                    }
                }; 

  ngOnInit(){    
     this.getProjectsList();
  }

  searchItems(ev: any){ 
   this.SharedService.sharedAllProjects = this.SearchService.filterItems(ev, this.SharedService.sharedAllProjectsNew);
  }

  projectListScroll(infiniteScroll) { 
      setTimeout(() => {
          if (this.nextValueFlag == false){
              infiniteScroll.complete();
              return;
        }else{
            let nextPageUrl = this.pageno++;
            console.log("next page:"+nextPageUrl);
            this.buildingService.getBuildingData(this.configService, this.SharedService.config_header_new, this.pageno).subscribe((projectList)=>{  
              if(projectList.next == null){
                  this.nextValueFlag = false;
              }        
              this.myAllProjects = projectList.results;
              this.allProjects = [];            
                for(var i=0; i< this.myAllProjects.length; i++){             
                      this.allProjects.push(this.myAllProjects[i]);
                      this.SharedService.sharedAllProjects.push(this.myAllProjects[i]);
                      this.SharedService.sharedAllProjectsNew.push(this.myAllProjects[i]);                
                } 
            },
            err => {
                console.log(err);
            },
            () => console.log('Next Page Loading completed')
            );                    
        }
        infiniteScroll.complete();
    }, 5000);
          
  }

  getProjectsList(){       
      this.SharedService.sharedAllProjects = [];
      this.SharedService.sharedAllProjectsNew = []; 
      this.buildingService.getBuildingData(this.configService, this.SharedService.config_header_new, this.pageno).subscribe((projectList)=>{  
          if(projectList.next == null){
            this.nextValueFlag = false;
          }  
          this.myAllProjects = projectList.results;
          this.allProjects = [];            
            for(var i=0; i< this.myAllProjects.length; i++){              
                this.allProjects.push(this.myAllProjects[i]);
                this.SharedService.sharedAllProjects.push(this.myAllProjects[i]);
                this.SharedService.sharedAllProjectsNew.push(this.myAllProjects[i]);                  
            } 
            if(this.SharedService.newAddedProjects.length>0){
                for(var j=0; j< this.SharedService.newAddedProjects.length; j++){
                    this.SharedService.sharedAllProjects.unshift(this.SharedService.newAddedProjects[j]);//To add new Projects
                    this.SharedService.sharedAllProjectsNew.unshift(this.SharedService.newAddedProjects[j]);//To add new Projects

                }
            }
      },
      err => {
          console.log(err);
      },
      () => console.log('Next Page Loading completed')
    );
    }
      

  

  goToProjectDetailsPage(event, project){
        this.navCtrl.push(ProjectDetailsPage, {
         projectObject: project,           
        });
    }

  }



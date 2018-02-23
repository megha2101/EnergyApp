import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';

//Providers
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { BuildingProjectServiceProvider } from '../../providers/building-project-service/building-project-service';
import { SearchServiceProvider } from '../../providers/search-service/search-service';
import { ProjectDetailsPage } from '../project-details/project-details';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';


@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {

  myAllProjects: any = [];
  allProjects: any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public BuildingProjectService: BuildingProjectServiceProvider, public SharedService: SharedServiceProvider,
  public SearchService: SearchServiceProvider, public configService: ConfigServiceProvider, public sharedService: SharedServiceProvider) {
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

  sum_score(project){
    return this.SharedService.check_value_null(parseInt(project.water))+this.SharedService.check_value_null(parseInt(project.energy))
    +this.SharedService.check_value_null(parseInt(project.human_experience))+this.SharedService.check_value_null(parseInt(project.waste))
    +this.SharedService.check_value_null(parseInt(project.transport))+this.SharedService.check_value_null(parseInt(project.base_score));
  }

  

  getProjectsList(){
      this.SharedService.sharedAllProjects = [];
      this.SharedService.sharedAllProjectsNew = []; 
     if(this.sharedService.apiProjectList.count>0){  
          this.myAllProjects = this.sharedService.apiProjectList;
          this.allProjects = [];            
            for(var i=0; i< this.myAllProjects.results.length; i++){
                if(this.myAllProjects.results[i].project_type == "building"){
                  this.allProjects.push(this.myAllProjects.results[i]);
                  this.SharedService.sharedAllProjects.push(this.myAllProjects.results[i]);
                  this.SharedService.sharedAllProjectsNew.push(this.myAllProjects.results[i]);
                }   
            } 
            if(this.SharedService.newAddedProjects.length>0){
                for(var j=0; j< this.SharedService.newAddedProjects.length; j++){
                    this.SharedService.sharedAllProjects.push(this.SharedService.newAddedProjects[j]);//To add new Projects
                    this.SharedService.sharedAllProjectsNew.push(this.SharedService.newAddedProjects[j]);//To add new Projects

                }
            }
            if (this.SharedService.sharedAllProjects.length>0){ 
              $("#default_list").hide();
          }else{
              $("#default_list").show();
          }
      };  
  } 

  goToProjectDetailsPage(event){
        this.navCtrl.push(ProjectDetailsPage, {
          id : event.target.offsetParent.id,  
        });
    }

  }



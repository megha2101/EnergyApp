import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { ProjectListPage } from '../project-list/project-list';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
})
export class AddProjectPage {

  newProject: string;
  addProjectForm: FormGroup;
  submitAttempt: boolean = false;
  //Country: String = "selectCountry";
  //State: String = "stateSelect";

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public SharedService: SharedServiceProvider, public storage: Storage, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.addProjectForm = formBuilder.group({
        projectName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
        unitType: ['IP'],
        projectType: ['projectTypeSelect'],
        ratingSystem:['ratingSystemSelect'],
        ownerType: ['ownerTypeSelect'],
        ownerCountry:['United States'],
        area:[''],
        ownerOrg:[''],
        ownerEmail:['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
        address: [''],
        city: [''],
        countryName: ['selectCountry'],
        state: ['stateSelect'],
        zipcode: ['', Validators.pattern('[0-9 ]*')],
        lat:[''],
        long:['']      
    });
  }

  

  ionViewDidLoad() {
    $(".countryErrorMessage").hide();
  }

  setAllItems(){
    this.storage.set(this.newProject, {"name": this.addProjectForm.get('projectName').value ,
     "city": "washington", "country": "United States","state": "DC"}).then(()=>{ 
      console.log('Stored item!'+ this.newProject);
      this.getAllItems();
      error => console.error('Error storing item', error)
    });
    
  }
  
  getAllItems(){    
      this.storage.get(this.newProject).then((data) =>{
        if(data){
          this.SharedService.myNewProject = data;
          //this.SharedService.sharedAllProjects.push(this.SharedService.myNewProject);
          //this.SharedService.sharedAllProjectsNew.push(this.SharedService.myNewProject);
          this.SharedService.newAddedProjects.push(this.SharedService.myNewProject);
          this.navCtrl.push(ProjectListPage);
        }else{
          console.log('Error in getting new item');
        }
      });
    } 

  
    

  addNewProject(){
      this.submitAttempt = true;
      if(!this.addProjectForm.valid){      
      }
      else {        
        this.setAllItems();
        console.log("hello")
      }
  }

}

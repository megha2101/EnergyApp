import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
    public SharedService: SharedServiceProvider, public storage: Storage, public viewCtrl: ViewController) {
    this.addProjectForm = formBuilder.group({
      projectName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      area: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9 ]*'), Validators.required])],
      unit: ['selectUnit', Validators.compose([Validators.required])],
      address: [''],
      city: [''],
      countryName: ['selectCountry', Validators.compose([Validators.required])],
      state: ['stateSelect', Validators.compose([Validators.required])],
      zipcode: [''],      
    });
  }

  

  ionViewDidLoad() {
    $(".countryErrorMessage").hide();
  }

  stateFn(stateVal){
    if(stateVal.value != 'stateSelect'){
      $(".invalid").removeClass();
    }
  }

  countryFn(countryVal){
    if(countryVal != 'selectCountry'){
      $("ion-select").removeClass("invalid");
      $(".countryErrorMessage").hide();
    }else{
      $("ion-select:last").addClass("invalid");
      $(".countryErrorMessage").show();
    }
  }


  setAllItems(){
    this.storage.set(this.newProject, {"name": this.addProjectForm.get('projectName').value , "gross_area": this.addProjectForm.get('area').value,
     "city": "washington", "country": "United States","state": "DC"}).then(()=>{ 
      console.log('Stored item!');
      this.getAllItems();
      error => console.error('Error storing item', error)
    });
    
  }
  
  getAllItems(){    
      this.storage.get(this.newProject).then((data) =>{
        if(data){
          this.SharedService.myNewProject = data;
          this.SharedService.sharedAllProjects.push(this.SharedService.myNewProject);
          this.SharedService.sharedAllProjectsNew.push(this.SharedService.myNewProject);
          this.navCtrl.pop();
        }else{
          console.log('Error in getting new item');
        }
      });
    } 

  
    

  addNewProject(){
      this.submitAttempt = true;
      // this.SharedService.stateValue = this.addProjectForm.get('state').value;
      // this.SharedService.countryValue = this.addProjectForm.get('countryName').value;
      
      
      // if(this.SharedService.stateValue == "stateSelect" || this.SharedService.countryValue == "countrySelect"){
      //   $(".invalid").addClass();
      // }
      if(!this.addProjectForm.valid){      
      }
      else {        
        this.setAllItems();
        console.log("hello")
      }
  }

}

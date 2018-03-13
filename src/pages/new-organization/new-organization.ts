import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import { RegistrationServiceProvider } from '../../providers/registration-service/registration-service';
import { AddProjectPage } from '../add-project/add-project';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { GeoServiceProvider } from '../../providers/geo-service/geo-service';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { ValidationServiceProvider } from '../../providers/validation-service/validation-service';

@IonicPage()
@Component({
  selector: 'page-new-organization',
  templateUrl: 'new-organization.html',
})
export class NewOrganizationPage{
   
    submitAttempt          : boolean;
    addNewOrganizationForm : FormGroup;
    orgCategory            : any = '2';
    orgSubCategory         : any= '27';
    orgName                : any;
    orgContactName         : any;
    orgContactEmail        : any;
    orgWebsite             : any;
    error_msg_org          : any;
    error_org              : boolean = false;
    indSubCategoryErrorMsg : boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http,
    public registrationService: RegistrationServiceProvider, public sharedService: SharedServiceProvider, public geoService: GeoServiceProvider,
    public validationService: ValidationServiceProvider) {
        this.addNewOrganizationForm = formBuilder.group({
          newOwnerOrg: ['', Validators.compose([Validators.maxLength(40),Validators.pattern(this.sharedService.formValidation.name),Validators.required])],
          newOwnerRepresentative: ['', Validators.compose([Validators.maxLength(40),Validators.required])],
          newOwnerContactEmail: ['', Validators.compose([Validators.maxLength(40), Validators.pattern(this.sharedService.formValidation.email), Validators.required])],
          newOwnerWebsite: ['', Validators.compose([Validators.maxLength(40),Validators.pattern(this.sharedService.formValidation.weburl)])],
          indCategory: [''],
          indSubCategory:['selectSubCategory', Validators.compose([Validators.required])], 
        });
    }

    ngOnInit() {  
     
    }

    updateSubCategory(orgCategory){
      this.orgSubCategory = "selectSubCategory";      
    }


    validateOrganization(org_name, org_country){
        if(org_name!= '' && org_name!=null){
            this.geoService.getCountryStates().subscribe((data)=> {
                var org_full_country = this.sharedService.getCountryName(org_country, this.sharedService.doSorting(data.countries));
                this.validationService.validateOrganization(org_name, org_full_country).subscribe((data)=> {
                    if(data.status){
                        if(data.is_blocked){
                            return false; //blocked 
                        }else{
                            return true; //not blocked
                        }
                    }
                }, err =>{
                      console.log("error in validationorganization");
                    }
                );                    
                },err =>{
                console.log("error in validationorganization");
                }
            );
        }
    };


    createOrganization(){    
        var postData = 
        {
            orgName:  this.orgName, 
            orgContactName:  this.orgContactName, 
            orgContactEmail: this.orgContactEmail,
            orgWebsite: this.orgWebsite,
            orgCategory: this.orgCategory,
            orgSubCategory: this.orgSubCategory
        };
        
        this.registrationService.createNewOwnerOrganization(postData).subscribe((data) => {
            if(data['record_duplicate'] != undefined){
                this.error_org = true;
                this.error_msg_org = data['record_duplicate'];
                return;
            }
            this.error_org = false;
            this.error_msg_org = '';
            this.sharedService.formdata.organization = this.orgName;
            this.sharedService.org_query = this.orgName;
            this.navCtrl.pop();
        },err=> { 
            console.log("error in creating new owner organization.")
        })
    }

    validateInSubCategory(orgSubCategory){
      if(this.orgSubCategory == "selectSubCategory"){
          this.indSubCategoryErrorMsg = true;
      }else{
          this.indSubCategoryErrorMsg = false;
      }
    }

    addNewOrganization(){
        this.submitAttempt = true;
        if(this.orgSubCategory == "selectSubCategory"){
           this.indSubCategoryErrorMsg = true;
        }else{
          this.indSubCategoryErrorMsg = false;
          if(!this.addNewOrganizationForm.valid){    
          }
          else {           
            this.createOrganization();   
          }
        }
        
    }
}
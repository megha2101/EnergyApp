import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { AddProjectPage } from '../add-project/add-project';
import { ProjectListPage } from '../project-list/project-list';
import { SignupPage } from '../signup/signup';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { BuildingProjectServiceProvider } from '../../providers/building-project-service/building-project-service';
import { NgClass } from '@angular/common';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  emailRegx: any;
  loginData: any;
  credentials:    any = {};
  config_header: any;
  loginText: any = "Log In";
  disableLoginFlag: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public storage: Storage,
  private iab: InAppBrowser, public LoginService: LoginServiceProvider, public sharedService: SharedServiceProvider,
  public configService: ConfigServiceProvider, public buildingService: BuildingProjectServiceProvider) {
      this.loginForm = formBuilder.group({
          loginEmail: ['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
          password: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
      });
  }

  ngAfterViewInit(){ 
  }

  openWebPage(){
      const browser = this.iab.create('https://www.usgbc.org/registration/create-user','_self');
  }
  
  login(){
    this.loginText = "LOGGING IN";
    this.disableLoginFlag = true;
      this.config_header = {
          headers: {
              "Content-Type": "application/json",
              "Ocp-Apim-Subscription-Key": this.configService.subscription_key
          }
      };
      this.credentials={
        // "username": this.loginForm.get('loginEmail').value,
        // "password": this.loginForm.get('password').value
        "username": "tbisht@icloud.com", //testuser@gmail.com //tbisht@icloud.com
        "password": "initpass"
      };
      this.LoginService.getLogin(this.credentials, this.config_header).subscribe((data)=>{ 
          this.configService.authToken = data.authorization_token;   
          this.sharedService.userDetails = data.user;      
          this.sharedService.config_header_new = 
              {
                  headers: 
                  {
                      "Content-Type": "application/json",
                      "Ocp-Apim-Subscription-Key": this.configService.subscription_key,
                      "Authorization": "Bearer " + this.configService.authToken
                  }
              }; 
          this.buildingService.getBuildingData1(this.configService, this.sharedService.config_header_new).subscribe((projectList)=>{
              this.sharedService.apiProjectList = projectList;
              if (projectList.count>0){
                  this.navCtrl.push(ProjectListPage);
                  this.loginText = "Log In";
                  this.disableLoginFlag = false; 
              }else{
                  this.navCtrl.push(AddProjectPage); 
                  this.loginText = "Log In";
                  this.disableLoginFlag = false;
              }
            },(err) => {
                  console.log("error in getting projects api");
              });  
      },(err) => {
              this.loginText = "Log In";
              this.disableLoginFlag = false;
              console.log("error in authentication api");
      });     
  }

  forgotPassword(){
    const browser = this.iab.create('https://www.usgbc.org/user/password','_self');
  }

  goToSignUpPage(){
      this.navCtrl.push(SignupPage);
  }
}

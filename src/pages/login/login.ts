import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { AddProjectPage } from '../add-project/add-project';
import { ProjectListPage } from '../project-list/project-list';
import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

      this.loginForm = formBuilder.group({
          username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
      });

  }

  login(){
      this.submitAttempt = true;
      if(!this.loginForm.valid){
        
      }
      else {
        //if (!params) params = {};
        this.navCtrl.push(ProjectListPage);
      } 
      
  }

  goToSignUpPage(){
    this.navCtrl.push(SignupPage);
  }
}

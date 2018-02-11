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
  emailRegx: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
          loginEmail: ['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
          password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
      });
  }

  login(){
      this.submitAttempt = true;
      if(!this.loginForm.valid){
        
      }
      else {
        //if (!params) params = {};
        this.navCtrl.push(AddProjectPage);
      } 
      
  }

  goToSignUpPage(){
    this.navCtrl.push(SignupPage);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { ProjectListPage } from '../project-list/project-list';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signUpForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage) {
        this.signUpForm = formBuilder.group({
            firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            lastName: ['', Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            emailNew: ['', Validators.compose([ Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.required])],
            confirmEmail: ['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            //termsAndConditions:['', Validators.compose([Validators.required])],
          });
    }

    signup(){
      this.submitAttempt = true;
      if(!this.signUpForm.valid){      
      }
      else {
        console.log('Stored item!');
        this.navCtrl.push(ProjectListPage);
      } 
  }

}

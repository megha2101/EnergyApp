import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { AnalysisPage } from '../pages/analysis/analysis';
import { AddProjectPage } from '../pages/add-project/add-project';
import { ProjectListPage } from '../pages/project-list/project-list';
import { ProjectDetailsPage } from '../pages/project-details/project-details';
import { ProjectAnalysisPage } from '../pages/project-analysis/project-analysis';
import { SourcePage } from '../pages/source/source';
import { AddMeterDataPage } from '../pages/add-meter-data/add-meter-data';
import { SignupPage } from '../pages/signup/signup';
import { AddSourcePage } from '../pages/add-source/add-source';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = DashboardPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      
      //  if (platform.is('ios')) {
      //     let 
      //       appEl = <HTMLElement>(document.getElementsByTagName('ION-APP')[0]),
      //       appElHeight = appEl.clientHeight;

      //     //Keyboard.disableScroll(true);

      //     window.addEventListener('native.keyboardshow', (e) => {
      //       appEl.style.height = (appElHeight - (<any>e).keyboardHeight) + 'px';
      //     });

      //     window.addEventListener('native.keyboardhide', () => {
      //       appEl.style.height = '100%';
      //     });

      //   }
    });
  }
}


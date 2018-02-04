import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';



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


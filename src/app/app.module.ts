import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { AnalysisPage } from '../pages/analysis/analysis';
import { RegisterationPage } from '../pages/registeration/registeration';
import { AddProjectPage } from '../pages/add-project/add-project';
import { ProjectListPage } from '../pages/project-list/project-list';
import { ProjectDetailsPage } from '../pages/project-details/project-details';
import { ProjectAnalysisPage } from '../pages/project-analysis/project-analysis';
import { SourcePage } from '../pages/source/source';
import { AddMeterDataPage } from '../pages/add-meter-data/add-meter-data';
import { AddSourcePage } from '../pages/add-source/add-source';
import { SignupPage } from '../pages/signup/signup';

//Providers
import { SharedServiceProvider } from '../providers/shared-service/shared-service';
import { BuildingProjectServiceProvider } from '../providers/building-project-service/building-project-service';

//Components
import { FabIconComponent } from '../components/fab-icon/fab-icon';
import { SearchServiceProvider } from '../providers/search-service/search-service';
import { SourcesListPage } from '../pages/sources-list/sources-list';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ConfigServiceProvider } from '../providers/config-service/config-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    LoginPage,
    AnalysisPage,
    RegisterationPage,
    AddProjectPage,
    ProjectListPage,
    FabIconComponent,
    ProjectDetailsPage,
    ProjectAnalysisPage,
    SourcePage,
    AddMeterDataPage,
    SignupPage,
    AddSourcePage,
    SourcesListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AmChartsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          statusbarPadding: true
        }
      }
      }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    LoginPage,
    AnalysisPage,
    RegisterationPage,
    AddProjectPage,
    ProjectListPage,
    FabIconComponent,
    ProjectDetailsPage,
    ProjectAnalysisPage,
    SourcePage,
    AddMeterDataPage,
    SignupPage,
    AddSourcePage,
    SourcesListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedServiceProvider,
    BuildingProjectServiceProvider,
    SearchServiceProvider,
    InAppBrowser,
    LoginServiceProvider,
    ConfigServiceProvider
  ]
})
export class AppModule {}

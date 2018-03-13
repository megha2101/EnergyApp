import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterationPage } from '../registeration/registeration';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { AnalysisServiceProvider } from '../../providers/analysis-service/analysis-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { ScoreRecomputeServiceProvider } from '../../providers/score-recompute-service/score-recompute-service';


@IonicPage()
@Component({
  selector: 'page-project-analysis',
  templateUrl: 'project-analysis.html',
})
export class ProjectAnalysisPage {

  private chart: AmChart;
  hasUserSelectedDate: any;
  selectedDate: any;
  analysisData: any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedService: SharedServiceProvider,
  public storage: Storage, private AmCharts: AmChartsService, public analysisService: AnalysisServiceProvider,
  public configService: ConfigServiceProvider, public scoreRecomputeService: ScoreRecomputeServiceProvider)
  {
  }

  ngOnInit(){     
    this.analysisService.getEnergyAnanlysisData("energy", this.sharedService.selBuildObject.leed_id,this.hasUserSelectedDate,
    this.selectedDate, this.configService, this.sharedService.config_header_new).then((result) => {  
        this.analysisData = result;
        this.sharedService.drawAnalysisChart('energy',this.analysisData.year_data[0].values,"#D0DD3D");        
    }); 

    if(this.sharedService.energyAnalysisInfo == undefined)
    {   
        this.scoreRecomputeService.scoreRecompute();            
        this.analysisService.getEnergyAnanlysisData("energy", this.sharedService.selBuildObject.leed_id,this.hasUserSelectedDate,
        this.selectedDate, this.configService, this.sharedService.config_header_new);
    }
  }

 adjusted_emissions_per_sf(){
    var unit = this.sharedService.getUnitTypeForJson();
    if (this.sharedService.energyAnalysisInfo != undefined){
    if (this.sharedService.energyAnalysisInfo != undefined){
       return this.sharedService.energyAnalysisInfo["Adjusted Emissions per SF (mtco2e/"+unit+")"];
    }
    };
 }

  save(){
    this.navCtrl.push(LoginPage);
  }

}


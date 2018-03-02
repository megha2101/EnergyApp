import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterationPage } from '../registeration/registeration';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { AnalysisServiceProvider } from '../../providers/analysis-service/analysis-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';


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
  public configService: ConfigServiceProvider)
  {
  }

  ngOnInit(){     
    this.analysisService.getEnergyAnanlysisData("energy", this.sharedService.selBuildObject.leed_id,this.hasUserSelectedDate,
    this.selectedDate, this.configService, this.sharedService.config_header_new).then((result) => {  
        this.analysisData = result;
        this.sharedService.drawAnalysisChart('energy',this.analysisData.year_data[0].values,"#D0DD3D");        
    }); 
  }

  save(){
    this.navCtrl.push(LoginPage);
  }

}

// drawAnalysisChart = function(category, dataProvider, color){
//   var chart = this.AmCharts.makeChart("analysis", {
//     "type": "serial",
//     "theme": "light",
//     "hideCredits":true,
//     "marginRight": 25,
//     "marginLeft": 20,
//     "autoMarginOffset": 10,
//     "mouseWheelZoomEnabled":false,
//     "dataDateFormat": "YYYY-MM-DD",
//     "valueAxes": [{
//         "id": "v1",
//         "axisAlpha": 0,
//         "position": "left",
//         "ignoreAxisWidth":false,
//         "title": "Scores"
//     }],
//     "balloon": {
//         "borderThickness": 1,
//         "shadowAlpha": 0,
//     },
//     "graphs": [{
//         "id": "g1",
//         "lineColor": "#D0DD3D",
//         "balloon":{
//           "drop":true,
//           "adjustBorderColor":false,
//           "color":"#ffffff"
//         },
//         "bullet": "round",
//         "bulletBorderAlpha": 1,
//         "bulletColor": "#D0DD3D",
//         "bulletSize": 5,
//         "hideBulletsCount": 50,
//         "lineThickness": 2,
//         "title": "red line",
//         "useLineColorForBulletBorder": true,
//         "valueField": "value",
//         "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
//     }],
//     "chartCursor": {
//         "pan": true,
//         "valueLineEnabled": true,
//         "valueLineBalloonEnabled": true,
//         "cursorAlpha":1,
//         "cursorColor":"#D0DD3D",
//         "limitToGraph":"g1",
//         "valueLineAlpha":0.2,
//         "valueZoomable":true
//     },
//     "categoryField": "date",
//     "categoryAxis": {
//       "markPeriodChange":false,
//       "parseDates": true,
//       "dashLength": 1,
//       //"parseDates": true,
//       "dateFormats":[{period:'fff',format:'JJ:NN:SS'},{period:'ss',format:'JJ:NN:SS'},{period:'mm',format:'JJ:NN'},{period:'hh',format:'JJ:NN'},{period:'DD',format:'MMM DD'},{period:'WW',format:'MMM DD'},{period:'MM',format:'MMM YYYY'},{period:'YYYY',format:'YYYY'}],
//       "boldPeriodBeginning": true,
//       "equalSpacing": true,
//       "startOnAxis": true,
//       "minorGridEnabled": true,
//       "title": "Months"
//     },
//     "export": {
//         "enabled": true
//     },
//     "dataProvider": dataProvider.map(function (point){
//                     console.log("point is: " +point);
//                      return [point.value]; 
//                  })
// });
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterationPage } from '../registeration/registeration';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";


@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {
  private scoreAnalysisChart: AmChart;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedService: SharedServiceProvider,
    public storage: Storage, private AmCharts: AmChartsService)
  {
  }

  ngAfterViewInit(){    
    this.getBasicInformation();
    var scoreAnalysisChart = this.AmCharts.makeChart( "scoreAnalysis", {
      "type": "serial",
      "theme": "light",
       "hideCredits":true,
       "autoMargins": false,
       "marginLeft": 50,
       "marginRight": 8,
       "marginTop": 10,
       "marginBottom": 30,
      "dataProvider": [ {
          "BuildingName": "Your Building",
          "Score": 59
        },{
          "BuildingName": "Local Average",
          "Score": 68,
          "dashLengthLine": 5,
          "dashLengthColumn": 5,
          "alpha": 0.2,
            }, {
          "BuildingName": "Global Average",
          "Score": 62,       
          "dashLengthColumn": 5,
          "alpha": 0.2,
        }],
      "valueAxes": [ {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0,
        "title": "Scores"
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
      "alphaField": "alpha",
         "lineColor": "#D0DD3D",
        "balloonText": "[[category]] Score: <b>[[value]]</b>",
         "fillAlphas": 1,
        "type": "column",
        "valueField": "Score",
       "dashLengthField": "dashLengthColumn"
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "BuildingName",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 0,
        "autoWrap": true
      },
      "export": {
        "enabled": true
      }   
    } );
  }

  getBasicInformation(){    
    this.storage.get(this.sharedService.basicInformation).then((data) =>{
      if(data){
       console.log(data);
      }else{
        console.log('Error in getting new item');
      }
    });
  } 

  save(){
    this.navCtrl.push(LoginPage);
  }

}

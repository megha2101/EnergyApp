import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ProjectAnalysisPage } from '../project-analysis/project-analysis';

import { SourcePage } from '../source/source';
import { AddSourcePage } from '../add-source/add-source';
import { SourcesListPage } from '../sources-list/sources-list';

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {

  private chart: AmChart;

  constructor(public navCtrl: NavController, public navParams: NavParams, private AmCharts: AmChartsService) {
  }

  ngAfterViewInit(){   
    var chart = this.AmCharts.makeChart( "averageAnalysisGraph", {
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

  goToSourceListPage(){
    this.navCtrl.push(SourcesListPage);
  }

  goToProjectAnalysisPage(){
    this.navCtrl.push(ProjectAnalysisPage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { AddMeterDataPage } from '../add-meter-data/add-meter-data';

@IonicPage()
@Component({
  selector: 'page-source',
  templateUrl: 'source.html',
})
export class SourcePage {

  public chart3: AmChart;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private AmCharts: AmChartsService) {
  }

  ngAfterViewInit(){
    var chart3 = this.AmCharts.makeChart( "chartdiv3", {
      "type": "serial",
      "hideCredits":true,
      "theme": "light",
      "marginRight": 25,
      "marginLeft": 20,
      "autoMarginOffset": 10,
      "dataDateFormat": "YYYY-MM-DD",
      "valueAxes": [ {
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth": false,
        "title": "kWh"
      } ],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [ {
        "id": "g1",
        "lineColor": "#D0DD3D",
        "balloon": {
          "drop": true,
          "adjustBorderColor": false,
          "color": "#ffffff",
          "type": "smoothedLine"
        },
        "fillAlphas": 0.2,
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#D0DD3D",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      } ],
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#D0DD3D",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable":true
    },
      "categoryField": "date",
      "categoryAxis": {
        "markPeriodChange":false,
        "parseDates": true,
        "dashLength": 1,
        //"parseDates": true,
        "dateFormats":[{period:'fff',format:'JJ:NN:SS'},{period:'ss',format:'JJ:NN:SS'},{period:'mm',format:'JJ:NN'},{period:'hh',format:'JJ:NN'},{period:'DD',format:'MMM DD'},{period:'WW',format:'MMM DD'},{period:'MM',format:'MMM YYYY'},{period:'YYYY',format:'YYYY'}],
        "boldPeriodBeginning": true,
        "equalSpacing": true,
        "startOnAxis": true,
        "minorGridEnabled": true,
        "title": "Months"
      },
      "export": {
        "enabled": true
      },
      "dataProvider": [ {
        "date": "2017-02-27",
        "value": 30
      }, {
        "date": "2017-03-27",
        "value": 45
      }, {
        "date": "2017-04-27",
        "value": 55
      }, {
        "date": "2017-05-27",
        "value": 46
      }, {
        "date": "2017-06-27",
        "value": 38
      }, {
        "date": "2017-07-27",
        "value": 63
      }, {
        "date": "2017-08-27",
        "value": 22
      }, {
        "date": "2017-09-27",
        "value": 23
      }, {
        "date": "2017-10-27",
        "value": 28
      }, {
        "date": "2017-11-27",
        "value": 47
      }, {
        "date": "2017-12-27",
        "value": 36
      }, {
        "date": "2018-01-27",
        "value": 58
      }]
    });
  }

  goToAddMeterDataPage(){
    this.navCtrl.push(AddMeterDataPage);
  }



}

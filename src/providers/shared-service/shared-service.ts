import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import * as moment from 'moment';

@Injectable()
export class SharedServiceProvider {
  private chart: AmChart;

  sharedAllProjects    : any     = [];
  myNewProject         : string;
  stateValue           : string;
  countryValue         : string;
  basicInformation     : string;
  sharedAllProjectsNew : any     = [];
  newAddedProjects     : any     = [];
  config_header_new    : any     = {};
  selBuildObject       : any     = {};
  selBuildObjectScore  : any;
  ScoreValue           : any     = [];
  demoFlag             : boolean = false;

  projectCategoryMax   : any     = [];
  
  projectEnergyScore   : any     = [];
  projectTotalScore    : any     = [];
  projectBaseScore     : any     = [];
  
  globalAverage        : any     = [];
  projectEnergyAVGScore: any     = 0;
  projectBaseAVGScore  : any     = 0;
  
  projectEnergyScoreChange :any  = 0;
  projectBaseScoreChange: any    = 0;
  
  projectEnergyCurrent  : any    = 0;
  projectEnergyLast     : any    = 0;

  projectBaseCurrent    : any    = 0;
  projectBaseLast       : any    = 0;
  
  projectEnergyLastYear : any    = [];  
  projectBaseLastYear   : any    = [];

  energyAnalysisInfo    : any    = {};
  projectType           : any    = "building";
  mymeters              : any    = {};
  mymetersArray         : any    = [];
  selMeterObj           : any;
  checkMeterName        : boolean = false;
  energy_data           : any    = [];
  total_meters          : any    = "";
  meters_on_screen      : any;
  page_size             : any    = 2;
  page_count            : any    = 1;
  loading_more_meters   : boolean = true;

  //Storing data from api
  apiProjectList        : any     = {}; //json


  constructor(public http: HttpClient, private AmCharts: AmChartsService) {
    
  }

  updateProjectStatus(status){
      if(status == undefined)
          return ''
      if (status == "agreement_pending"){
          return "Sign agreement"
      }
      else if (status == "addendum_agreement_pending"){
          return "Sign agreement"
      }
      else if (status == "activated_agreement_pending"){//use
          return "Sign agreement"
      }
      else if (status == "activated_addendum_agreement_pending"){ 
          return "Sign agreement"
      }
      else if (status == "activated_payment_pending"){ //use, Activate now-->Reg form with popu;ate fields
          return "Make payment"
      }
      else if (status == "activated_payment_done"){ //use
          
          return "Registered"
      }
      else if (status == "activated_under_review"){
          
          return "Under Review"
      }
      else if (status == "activated_review_payment_pending"){
          
          return "Deactivated"
      }
      else{
          return status.replace(/\_/g, ' ');
      }

  }

  check_value_null(value){
    if(value == null){
      return 0;
    }else{
      return value;
    }
  }

  drawEmptyChart = function(chart_id, lineColor, unit)
  {
      var start_date, date;
      start_date = new Date(new Date().getFullYear() + '-01-01');
      var dataProvider_temp = [];
      
      for(var i = 0; i <= 11; i++)
      {
          dataProvider_temp.push(
          {
              start_date: moment(new Date()).subtract(i, 'month').format("YYYY-MM-DD"),
              end_date:  moment(new Date()).subtract(i + 1, 'month').subtract(1, 'day').format("YYYY-MM-DD"),
              reading: ""
          });
      }
      this.drawChart(chart_id, dataProvider_temp, lineColor, 'empty', unit); 
  }

  drawChart = function(chart_id, dataProvider, lineColor, type, unit){
    {         
      if(chart_id == 'survey_chart' || chart_id == 'dissatisfation_chart')
      {
          var custom_units = '%';
          var graph_title = '% of Respondents';
      }
      else
      {
          var custom_units = '';
          var graph_title = '';
      }
      if(type == 'column')
      {   
          
      }
      else
      {
          dataProvider = dataProvider.slice().reverse();
          var chart = this.AmCharts.makeChart(chart_id,
          {
              "type": "serial",
              "hideCredits":true,
              "marginRight": 40,
              "marginLeft": 40,
              "autoMarginOffset": 20,
              "dataDateFormat": "MMM DD, YYYY",
              "valueAxes": [
              {
                  "position": "left",
                  "title": unit,
                  "minimum": 0,
                  "gridThickness": 0
              }],
              "balloon":
              {
                  "borderThickness": 1,
                  "shadowAlpha": 0
              },
              "graphs": [
              {
                  "id": "g1",
                  "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[reading]]</span></b>",
                  "bullet": "round",
                  "bulletSize": 8,
                  "bulletBorderColor": "#ffffff",
                  "bulletBorderAlpha": 1,
                  "bulletBorderThickness": 2,
                  "lineColor": lineColor,
                  "lineThickness": 2,
                  "type": "smoothedLine",
                  "valueField": "reading",
                  "fillAlphas": 0.5
              }],
              "chartCursor":
              {
                  "valueLineEnabled": true,
                  "valueLineBalloonEnabled": true,
                  "cursorAlpha": 0,
                  "zoomable": false,
                  "valueZoomable": false,
                  "valueLineAlpha": 0.5,
                  "cursorColor": lineColor,
              },
              "categoryField": "start_date",
              "categoryAxis":
              {
                  "dashLength": 1,
                  "minorGridEnabled": true,
                  "gridThickness": 0,
                  "title": "Dates",
                  "labelFunction": function(start_date, categoryAxis) {
                    return moment(start_date).format("D MMM");  
                  }
              },
              "dataProvider": dataProvider
          });
      }
  }
}

  
  drawComparableChart = function (){
    var chart = this.AmCharts.makeChart( "averageAnalysisGraph", {
      "type": "serial",
      "theme": "light",
       "hideCredits":true,
       "autoMargins": false,
       "marginLeft": 50,
       "marginRight": 8,
       "marginTop": 10,
       "marginBottom": 30,
      "dataProvider": [{
          "BuildingName": "Your Building",
          "Score": this.selBuildObjectScore
        },{
          "BuildingName": "Local Average",
          "Score": this.ScoreValue[1].energy_avg,
          "dashLengthLine": 5,
          "dashLengthColumn": 5,
          "alpha": 0.2,
            }, {
          "BuildingName": "Global Average",
          "Score": this.ScoreValue[0].energy_avg,//glovalScoreValue,       
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

  drawAnalysisChart = function(category, dataProvider, color){   
    var labelDuration = 'Months';
    var balloonText =  category.charAt(0).toUpperCase() + category.slice(1) + " Score on [[category]]: [[value]]";
        var chart = this.AmCharts.makeChart("analysis",
        {
            "hideCredits":true,
            "marginRight": 25,
            "marginLeft": 20,
            "autoMarginOffset": 10,
            "type": "serial",
            "theme": "light",
            "dataProvider": dataProvider,
            "valueAxes": [
            {
                "position": "left",
                "title": "Scores",
                "gridThickness": 0,
                "axisAlpha": 0.5,
            }],
            "startDuration": 0.5,
            "graphs": [
            {
                "balloonText": balloonText,
                "bullet": "round",
                "title": category,
                "valueField": "value",
                "lineColor": color,
                "fillAlphas": 0,
            }],
            "categoryField": "label",
            "categoryAxis":
            {
                "gridPosition": "start",
                "axisAlpha": 0.5,
                "fillAlpha": 0.05,
                "fillColor": "#000000",
                "gridAlpha": 0,
                "position": "bottom",
                "dateFormats":[{period:'fff',format:'JJ:NN:SS'},{period:'ss',format:'JJ:NN:SS'},{period:'mm',format:'JJ:NN'},{period:'hh',format:'JJ:NN'},{period:'DD',format:'MMM DD'},{period:'WW',format:'MMM DD'},{period:'MM',format:'MMM YYYY'},{period:'YYYY',format:'YYYY'}],
                "title": labelDuration,
            }
        });

}

}

//   var meter1Chart = this.AmCharts.makeChart( "meter1ChartDiv", {
  //     "type": "serial",
  //     "hideCredits":true,
  //     "theme": "light",
  //     "marginRight": 25,
  //     "marginLeft": 20,
  //     "autoMarginOffset": 10,
  //     "dataDateFormat": "YYYY-MM-DD",
  //     "valueAxes": [ {
  //       "id": "v1",
  //       "axisAlpha": 0,
  //       "position": "left",
  //       "ignoreAxisWidth": false,
  //       "title": "kWh"
  //     } ],
  //     "balloon": {
  //       "borderThickness": 1,
  //       "shadowAlpha": 0
  //     },
  //     "graphs": [ {
  //       "id": "g1",
  //       "lineColor": "#D0DD3D",
  //       "balloon": {
  //         "drop": true,
  //         "adjustBorderColor": false,
  //         "color": "#ffffff",
  //         "type": "smoothedLine"
  //       },
  //       "fillAlphas": 0.2,
  //       "bullet": "round",
  //       "bulletBorderAlpha": 1,
  //       "bulletColor": "#D0DD3D",
  //       "bulletSize": 5,
  //       "hideBulletsCount": 50,
  //       "lineThickness": 2,
  //       "title": "red line",
  //       "useLineColorForBulletBorder": true,
  //       "valueField": "value",
  //       "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
  //     } ],
  //     "chartCursor": {
  //       "pan": true,
  //       "valueLineEnabled": true,
  //       "valueLineBalloonEnabled": true,
  //       "cursorAlpha":1,
  //       "cursorColor":"#D0DD3D",
  //       "limitToGraph":"g1",
  //       "valueLineAlpha":0.2,
  //       "valueZoomable":true
  //   },
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
  //       "enabled": true
  //     },
  //     "dataProvider": [ {
  //       "date": "2017-02-27",
  //       "value": 30
  //     }, {
  //       "date": "2017-03-27",
  //       "value": 45
  //     }, {
  //       "date": "2017-04-27",
  //       "value": 55
  //     }, {
  //       "date": "2017-05-27",
  //       "value": 46
  //     }, {
  //       "date": "2017-06-27",
  //       "value": 38
  //     }, {
  //       "date": "2017-07-27",
  //       "value": 63
  //     }, {
  //       "date": "2017-08-27",
  //       "value": 22
  //     }, {
  //       "date": "2017-09-27",
  //       "value": 23
  //     }, {
  //       "date": "2017-10-27",
  //       "value": 28
  //     }, {
  //       "date": "2017-11-27",
  //       "value": 47
  //     }, {
  //       "date": "2017-12-27",
  //       "value": 36
  //     }, {
  //       "date": "2018-01-27",
  //       "value": 58
  //     }]
  //   });

  // }



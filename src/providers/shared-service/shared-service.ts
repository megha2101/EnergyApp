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
  validation_messages   : any    = {};

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
  dataInputMeters       : any     = [];
  meterToDelete         : any ;
  meterToDeleteElem     : any ;  
  //login page
  userDetails           : any;
  username              : any;
 //Registration page
 projectName            : any;
 all_action             : any = [];
 project_details        : any;

  //New organization Page
  newAddedOrgName       :any;
  formdata              :any  =   {
      "name": "",            
      "gross_area": "",
      "occupancy": "",
      "street": "",
      "city": "",
      "country": "US",
      "state": "",
      "project_type": "building",
      "unitType": "IP",
      "spaceType": "",
      "confidential": false,
      "sign_agreement": false,
      "manageEntityCountry": "US",
      "year_constructed": "",
      "organization": '',
      "operating_hours": "",    
  };

  //Storing data from api
  apiProjectList        : any     = {}; //json


  constructor(public http: HttpClient, private AmCharts: AmChartsService) {
    
  }
  ngOnInit(){
  
 }
  
  // form Validation
  formValidation: any = {
    "city": /^[\#\&\+\/\:\'\,\.\- a-zA-Z0-9]+$/,
    "cityMsg": "Please enter a valid city.",
    "grossArea" : /^\d*(\.\d+)?$/,
    "grossAreaMsg": "Please enter valid gross area.",
    "population": /^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9]|[1-8][0-9]{6}|9[0-8][0-9]{5}|99[0-8][0-9]{4}|999[0-8][0-9]{3}|9999[0-8][0-9]{2}|99999[0-8][0-9]|999999[0-9]|[1-8][0-9]{7}|9[0-8][0-9]{6}|99[0-8][0-9]{5}|999[0-8][0-9]{4}|9999[0-8][0-9]{3}|99999[0-8][0-9]{2}|999999[0-8][0-9]|9999999[0-9]|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|1[0-9]{9}|20[0-9]{8}|21[0-3][0-9]{7}|214[0-6][0-9]{6}|2147[0-3][0-9]{5}|21474[0-7][0-9]{4}|214748[0-2][0-9]{3}|2147483[0-5][0-9]{2}|21474836[0-3][0-9]|214748364[0-7])$/,
    "populationMsg": "Please enter valid population.",
    "occupancyMsg": "Please enter valid occupancy.",
    "name": /^[\#\&\+\/\:\'\,\.\- a-zA-Z0-9]+$/,
    "nameMsg": "Allowed special characters are & + / : ' , - . #",
    "postal": /^[1-9]\d*(\.\d+)?$/,
    "postalMsg": "Please enter a valid postal code.",
    "noOfFloors": /^[1-9]\d*$/,
    "noOfFloorsMsg": "Please enter valid number of floor.",
    "noOfParkingSpace": /^[1-9]\d*$/,
    "noOfParkingSpaceMsg": "Please enter valid number of parking space.",
    "noOfParkingLevels": /^[1-9]\d*$/,
    "noOfParkingLevelsMsg": "Please enter valid number of parking levels.",
    "noOfResUnits": /^[1-9]\d*$/,
    "noOfResUnitsMsg": "Please enter valid number of units.",
    "operatingHours": /^0*([1-9]|[1-8][0-9]|9[0-9]|1[0-5][0-9]|16[0-8])$/,
    "operatingHoursMsg": "Please enter valid number of hours",
    "projectId": /^[1-9]\d*$/,
    "projectIdMsg": "Please enter valid project ID",
    "geoLat": /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    "geoLatMsg": "Please enter valid latitude.",
    "geoLong": /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    "geoLongMsg": "Please enter valid longitude.",
    "CC_expiry": /^\s*(0[1-9]|1[0-2])\/(\d{4})\s*$/,
    "CC_expiryMsg": 'Please enter valid expiry date',
    "CC_number": /^[1-9]\d*$/,
    "CC_numberMsg": "Please enter valid credit card number.",
    "CC_CVV": /^[0-9]\d*$/,
    "CC_CVVMsg": "Please enter valid CVV.",
    "email": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "emailMsg": "Please enter valid email.",
    "state": /^null|$/,
    "stateMsg": "Please select valid state.",
    "phone_number": /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    "projectWebsite": /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    "projectWebsiteMsg": "Please enter a valid website.",
    "weburl": /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    "annualRiderShip": /^[1-9]\d*$/,
    "annualRiderShipMsg": "Please enter valid annual ridership.",
    "gstin" : /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1})?$/i,
    "gstinMsg": "Enter valid GSTIN",
    "full_time_staff": /^[1-9]\d*$/,
    "full_time_staffMsg": "Please enter valid full time staff.",
    "time_spent_by_riders": /^[1-9]\d*$/,
    "time_spent_by_ridersMsg": "Please enter valid hours.",
    "invoice" : /^\d{10}$/,
    "invoiceMsg": "Please enter valid invoice number"
};

  convertAnalysisNumber(val, value_duration, value_type, result_duratiom, result_type, decimals){
      var gross_area = isNaN(parseFloat(this.selBuildObject.gross_area)) ? 0 : this.selBuildObject.gross_area;
      var occupancy = isNaN(parseFloat(this.selBuildObject.occupancy)) ? 0 : this.selBuildObject.occupancy;

      let value = parseFloat(val);

      if(isNaN(value) || value == Infinity)
      {
          value = 0.0000;
      }
      else
      {
          value = parseFloat(val);
      }

      if(value_type == 'per_sf')
      {
          value *= gross_area;
      }
      if(value_type == 'per_occupant')
      {
          value *= occupancy;
      }

      if(result_type == 'per_sf')
      {
          value /= gross_area;
      }
      if(result_type == 'per_occupant')
      {
          value /= occupancy;
      }

      if(value_duration == 'per_day')
      {
          value *= 365;
      }
      if(value_duration == 'per_month')
      {
          value *= 12;
      }

      if(result_duratiom == 'per_month')
      {
          value /= 12;
      }
      if(result_duratiom == 'per_day')
      {
          value /= 365;
      }

      return isNaN(parseFloat(value.toFixed(decimals))) || value == Infinity ? '-' : parseFloat(value.toFixed(decimals));
  };

    getUserDetail(){
      if (this.userDetails.first_name  && this.userDetails.first_name  != ""){
          if (this.userDetails.last_name  && this.userDetails.last_name  != ""){
              return (this.userDetails.first_name  + " " + this.userDetails.last_name) ;
          }
          else{
              return (this.userDetails.first_name) ;
          }
      }
      else if (this.userDetails.id && this.userDetails.id != ""){
          return  (this.userDetails.id.split("@")[0]);
      }

    }

    getUnitTypeForJson(){ 
        if (this.selBuildObject.unitType == 'SI'){
            return 'sqm';
        }
        else{
            return 'sqft';
        }
    }


    getBrowser() {
        var ua = navigator.userAgent.toLowerCase();
        var ie = ua.indexOf("msie ") > -1 || ua.indexOf("trident/") > -1 || ua.indexOf("edge") > -1;
        var chrome = false;
        var safari = false;
        
        if (ua.indexOf('safari') != -1)
        { 
          if (ua.indexOf('chrome') > -1) 
          {
              chrome = true;
          } 
          else 
          {
            safari = true;
          }
        }
        
        return {ie: ie, chrome: chrome, safari: safari}; 
    }
    

  getCountryName = function(country, all_countries){
        for(var key in all_countries) {
            if(all_countries[key].code == country){
                return all_countries[key].name;
            }
        }
    };

    getStateName = function(state, all_states){
        for(var key in all_states) {          
            if(all_states[key].code == state){
                return all_states[key].name;
            }
        }
    }

    doSorting(obj) {
        var newList = [];
        
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                newList.push({code: key, name: obj[key]});
            }
        }
        
        newList = newList.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        
        return newList;
    };

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
                    "autoGridCount" : true,
                    "minHorizontalGap" : 100,
                    "showLastLabel" : true,
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



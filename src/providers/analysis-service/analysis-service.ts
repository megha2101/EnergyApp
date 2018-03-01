import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { AsyncServiceProvider } from '../../providers/async-service/async-service';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';

@Injectable()
export class AnalysisServiceProvider {

  energyAnalysisInfo: any;

  analysis_data: { 'year_data': any, 'info': any; };
  use_date: any = [];
  use_date_chart: any = [];
  chartOptions: any;
  last_12_month_score: any = [];
  last_12_month_data_present: any;


  todaysDate: any;
  previousYear: any;
  previousYearMonth: any;
  na_scope: any;
  projectId: any;

  projectCategoryMax: any = [];
  projectEnergyScore: any = [];
  projectTotalScore: any = [];
  projectBaseScore: any = [];

  globalAverage: any = [];
  localAverage: any=[];
  projectEnergyAVGScore : any= 0;
  projectBaseAVGScore: any = 0;

  projectEnergyScoreChange: any = 0;
  projectBaseScoreChange: any = 0;

  projectEnergyCurrent: any = 0;
  projectEnergyLast: any = 0;

  projectBaseCurrent: any = 0;
  projectBaseLast: any = 0;

  projectCurrentTotalScore: any = 0;

  projectEnergyLastYear: any = [];
  projectBaseLastYear: any = [];
  projectTotalScoreLastYear: any = [];

  constructor(public http: Http, private asyncService: AsyncServiceProvider, public sharedService:SharedServiceProvider) {
    
  }
   
  getEnergyAnanlysisData(report_type, projectId, hasUserSelectedDate, selectedDate, configService, config_header){

      if(this.analysis_data){
          return Promise.resolve(this.analysis_data);
      }
      return new Promise((resolve, reject) => {
          var noOfMonths = 12;
          var todaysDate = new Date();                            

          // if(hasUserSelectedDate){
          //     todaysDate = new Date(selectedDate);
          //     todaysDate.setDate(todaysDate.getDate() + 1); //for showing correct date to frontend
          // }

          if(this.sharedService.demoFlag){
              todaysDate = new Date("6/6/2017"); 
              // default data for demo purpose is 6/6/2017
              // if date is changed, please change its json file names and data as well
              // in assets/json-v2/project_ID/analytics
          }
      
          var previousYearMonth = new Date(todaysDate);
          previousYearMonth.setMonth(todaysDate.getMonth() - 11);
          
          var previousYear = new Date(todaysDate);
          previousYear.setFullYear(todaysDate.getFullYear() - 1);
          
          this.todaysDate = todaysDate;
          this.previousYear = previousYear;
          this.previousYearMonth = previousYearMonth;
          this.na_scope = 'n/a';
          var analysis_path = configService.basic_api_url + '/assets/LEED:' + projectId + '/analysis/';

          this.http.get(analysis_path, config_header).map(res => res.json()).subscribe((data)=> {
              if(data.energy != null && data.energy.info_json != "None")
              {
                this.sharedService.energyAnalysisInfo = JSON.parse(data.energy.info_json.replace(/'/g , '"').replace("None", '"None"').replace('""None""', '"None"')); 
              }
              else
              {
                this.sharedService.energyAnalysisInfo = {};
              }
          
          },
          err => {
              console.log(err);
          }); 
          //Getting score
          {
            this.sharedService.projectCategoryMax = [];
        
            this.sharedService.projectEnergyScore = [];
            this.sharedService.projectTotalScore = [];
            this.sharedService.projectBaseScore = [];
            
            this.sharedService.globalAverage = [];
            this.sharedService.projectEnergyAVGScore = 0;
            this.sharedService.projectBaseAVGScore = 0;
            
            this.sharedService.projectEnergyScoreChange = 0;
            this.sharedService.projectBaseScoreChange = 0;
            
            this.sharedService.projectEnergyCurrent = 0;
            this.sharedService.projectEnergyLast = 0;

            this.sharedService.projectBaseCurrent = 0;
            this.sharedService.projectBaseLast = 0;
            
        } 

        var currentMonth = todaysDate.getMonth();                
        var currentYear  = todaysDate.getFullYear();
        var currentMonthForApi = currentMonth + 1;
        var lastYearMonthForApi = currentMonthForApi + 1;
        var lastYear = currentYear - 1;

        if(hasUserSelectedDate){
            todaysDate = selectedDate;
            currentMonth = todaysDate.getMonth();               
            currentYear  = todaysDate.getFullYear();
            currentMonthForApi = currentMonth + 1;
        }

        var url: any  = "";
        var scoresQueryString = '/scores/';

        if(!this.sharedService.demoFlag)
            url += configService.basic_api_url + '/assets/LEED:' + projectId + scoresQueryString;
        else
            url = 'assets/json-v2/'+projectId+'/scores/scores.json';

        if(this.sharedService.projectType == 'building' ){
            var noOfMonths = 0;
            if(currentYear!=lastYear){
              for(var i = currentMonthForApi; i >= 1; i--)
              {                      
                  if(!this.sharedService.demoFlag){                            
                      scoresQueryString = '/scores/?at=' + currentYear + '-' + i + '-01&within=1';
                      url += ',' + configService.basic_api_url + '/assets/LEED:' + projectId + scoresQueryString;
                  }else{
                    url += ',' +'assets/json-v2/'+projectId+'/analytics/'+ currentYear + '-' + i + '-01.json';
                  }
                  noOfMonths++;

              }
            }

            for(var i = 12; i >= lastYearMonthForApi; i--)
            {     
                if(!this.sharedService.demoFlag){                                    
                    scoresQueryString = '/scores/?at=' + lastYear + '-' + i + '-01&within=1';
                    url += ',' + configService.basic_api_url + '/assets/LEED:' + projectId + scoresQueryString;
                }else{
                    url += ',' +'assets/json-v2/'+projectId+'/analytics/'+ lastYear + '-' + i + '-01.json';
                }
                noOfMonths++;
            }               

        }      
        
        if(!this.sharedService.demoFlag){  
              url += ',' + configService.basic_api_url +'/comparables/';
              url += ',' + configService.basic_api_url +'/comparables/?state=' + this.sharedService.selBuildObject.country + this.sharedService.selBuildObject.state;
          }else{
              url += ',' +'assets/json-v2/'+projectId+'/scores/comparables.json';
              url += ',' +'assets/json-v2/'+projectId+'/scores/comparables_state.json';
          }    
                    
        url = url.split(',') 
        //console.log("url are" + url);  
        this.asyncService.asyncServFunc(url, config_header).subscribe((data)=> {
            for(var i = 0; i < 12; i++)
                {
                    var monthData = data[i];
                    var prevMonth = new Date(todaysDate);
                    prevMonth.setMonth(prevMonth.getMonth() - i);
                    var year = prevMonth.getFullYear();
                    var month = prevMonth.getMonth() + 1;
                    var monthLabel = moment(prevMonth, 'MM').format('MMM');

                    try 
                    {
                        this.projectCategoryMax["energy"] = monthData["maxima"].energy;
                        this.projectCategoryMax["base"] = monthData["maxima"].base;
                    } 
                    catch ( e ) 
                    {
                        if(monthData["maxima"] == undefined)
                        {
                            monthData["maxima"] = {}    
                        }
                        monthData["maxima"].energy = 33;                    
                        monthData["maxima"].base = 10;
                    }
          
                    this.projectCategoryMax["energy"] = monthData["maxima"].energy;
                    this.projectCategoryMax["base"] = monthData["maxima"].base;
                    
                    var value_energy = 0;
                    var value_base = 0;
                    
                    try 
                    {
                        value_energy = monthData["scores"].energy
                    } 
                    catch ( e ) 
                    {}
                    
                    try 
                    {
                        value_base = monthData["scores"].base;
                    } 
                    catch ( e ) 
                    {}
                  
                    this.projectEnergyScore.push(
                        
                    {
                        "label": monthLabel,                 
                        "value": Math.round(value_energy),                 
                    });
                  
                    this.projectBaseScore.push(
                    {
                        "label": monthLabel,
                        "value": Math.round(value_base)
                    });
          
                    this.projectEnergyAVGScore += value_energy;
                    this.projectBaseAVGScore += value_base;
                    
                    if(i == 0)
                    {
                        this.projectEnergyCurrent = Math.round(value_energy);
                        this.projectBaseCurrent = Math.round(value_base);    
                    }
                    else if(i == (noOfMonths-1)) //11
                    {
                        this.projectEnergyLast = Math.round(value_energy);
                        this.projectBaseLast = Math.round(value_base);
                    }
                
                    
                }
          
                this.projectEnergyAVGScore = Math.round(this.projectEnergyAVGScore / 12);
                this.projectBaseAVGScore = Math.round(this.projectBaseAVGScore / 12);
                
                this.projectEnergyScoreChange = this.projectEnergyCurrent - this.projectEnergyLast;
                this.projectBaseScoreChange = this.projectBaseCurrent - this.projectBaseLast;

                this.sharedService.projectEnergyLastYear = [];  
                this.sharedService.projectBaseLastYear = [];
          
              this.sharedService.projectEnergyLastYear.push(
                  {
                      "key": "Cumulative Return",
                      "values": this.projectEnergyScore.reverse()
                  });
                
                  this.sharedService.projectBaseLastYear.push(
                  {
                      "key": "Cumulative Return",
                      "values": this.projectBaseScore.reverse()
                  });
          
                  var sum = 0;   
                  for(var i=0;i<this.sharedService.projectEnergyLastYear[0].values.length;i++)
                  {
                      sum +=this.sharedService.projectEnergyLastYear[0].values[i].value;
                  }
                  var temp =this.sharedService.projectEnergyLastYear[0].values;
                  this.sharedService.projectEnergyLastYear.push(
                  {
                      "max": Math.max.apply(Math,temp.map(function(o){return o.value;})),
                      "min": Math.min.apply(Math,temp.map(function(o){return o.value;})),
                      "avg": sum /this.sharedService.projectEnergyLastYear[0].values.length
                  });
          
                  sum = 0;
                  for(var i=0;i<this.sharedService.projectBaseLastYear[0].values.length;i++)
                  {
                      sum += this.sharedService.projectBaseLastYear[0].values[i].value;
                  }
                  var temp = this.sharedService.projectBaseLastYear[0].values;
                  this.sharedService.projectBaseLastYear.push(
                  {
                      "max": Math.max.apply(Math,temp.map(function(o){return o.value;})),
                      "min": Math.min.apply(Math,temp.map(function(o){return o.value;})),
                      "avg": sum / this.sharedService.projectBaseLastYear[0].values.length
                  });
                    
                  var totalScore = data[0];                
                  var total_energy = 0;
                  var total_base = 0;      
                  try 
                  {
                      total_energy = totalScore["scores"].energy
                  } 
                  catch ( e ) 
                  {}
                  
                  try 
                  {
                      total_base = totalScore["score"].base
                  } 
                  catch ( e ) 
                  {}
                    
                  this.globalAverage = data[noOfMonths+1]; //13
                  this.localAverage = data[noOfMonths+2]; //14
                  
                  this.analysis_data = {'year_data':this.sharedService.projectEnergyLastYear,'info':this.sharedService.energyAnalysisInfo};
                  //this.drawAnalysisChart('energy', this.analysis_data.year_data[0].values,"#D0DD3D");
                  //this. chartOptions=this.drawChartService.EnergyChart();  

                   resolve(this.analysis_data);
            },(error) => {
                  reject(error);     
            });
    
      });
  }

}
              

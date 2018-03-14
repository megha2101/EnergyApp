import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ImpMethodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImpMethodsProvider {

  constructor(public http: HttpClient) {
    
  }
  //********************To store the data in the storage variable
  // setAllItems(){
//   this.storage.set(this.newProject, {"name": this.addProjectForm.get('projectName').value ,
//    "city": "washington", "country": "United States","state": "DC"}).then(()=>{ 
//     console.log('Stored item!'+ this.newProject);
//     this.getAllItems();
//     error => console.error('Error storing item', error)
//   });
  
// }

// geoLocation code
// <ion-item no-lines>
// <ion-label >Geo location</ion-label>
// <ion-icon name="pin" item-end></ion-icon>      
// </ion-item>

// <ion-item >
// <ion-label stacked >Lat<span stacked class="fontSize"> (optional)</span></ion-label>
// <ion-input formControlName="lat" type="Number" ></ion-input>
// </ion-item>

// <ion-item >
// <ion-label stacked >Long<span stacked class="fontSize"> (optional)</span></ion-label>
// <ion-input formControlName="long" type="Number" ></ion-input>
// </ion-item> -->

// <!-- <ion-item no-lines style="margin-top: 15px;">
// <ion-label stacked style="color:#999;" text-wrap>I agree to the terms of our service agreement.</ion-label>
// <ion-checkbox></ion-checkbox>
// </ion-item> -->

//******************* */
//STORAGE 
// getAllItems(){    
//     this.storage.get(this.newProject).then((data) =>{
//       if(data){
//         this.SharedService.myNewProject = data;
//         //this.SharedService.sharedAllProjects.push(this.SharedService.myNewProject);
//         //this.SharedService.sharedAllProjectsNew.push(this.SharedService.myNewProject);
//         this.SharedService.newAddedProjects.push(this.SharedService.myNewProject);
//         this.navCtrl.push(ProjectListPage);
//       }else{
//         console.log('Error in getting new item');
//       }
//     });
//   } 

//ng model in add prject form
// <!-- Project Name -->
// <ion-item class="mtop; form-group" >
//    <ion-label stacked>Project Name</ion-label>
//    <ion-input maxlength="40" type="text" id="name" name="name" [(ngModel)]="formdata.name" class="form-control"  [pattern]="this.sharedService.formValidation.name"></ion-input>
// </ion-item>          
// <!-- Project Name -->

// openModalWindow(meter){
//   let alert = this.alertCtrl.create({
//     message: 'Do you want to delete the meter and associated data associated with the meter ?',
//     buttons: [
//       {
//         text: 'Yes',
//         handler: () => {
//           console.log('Yes clicked'+meter);
//           this.deleteMeter(meter, this.sharedService);
//         }
//       },
//       {
//         text: 'No',
//         role: 'cancel',
//         handler: () => {
//           console.log('Do not delete');
//         }
//       }
//     ]
//   });
//   alert.present();
//    // todo something
// }


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

//  this.chart3 = this.AmCharts.makeChart( "chartdiv3", {
    //   "type": "serial",
    //   "hideCredits":true,
    //   "theme": "light",
    //   "marginRight": 25,
    //   "marginLeft": 20,
    //   "autoMarginOffset": 10,
    //   "dataDateFormat": "YYYY-MM-DD",
    //   "valueAxes": [ {
    //     "id": "v1",
    //     "axisAlpha": 0,
    //     "position": "left",
    //     "ignoreAxisWidth": false,
    //     "title": "kWh"
    //   } ],
    //   "balloon": {
    //     "borderThickness": 1,
    //     "shadowAlpha": 0
    //   },
    //   "graphs": [ {
    //     "id": "g1",
    //     "lineColor": "#D0DD3D",
    //     "balloon": {
    //       "drop": true,
    //       "adjustBorderColor": false,
    //       "color": "#ffffff",
    //       "type": "smoothedLine"
    //     },
    //     "fillAlphas": 0.2,
    //     "bullet": "round",
    //     "bulletBorderAlpha": 1,
    //     "bulletColor": "#D0DD3D",
    //     "bulletSize": 5,
    //     "hideBulletsCount": 50,
    //     "lineThickness": 2,
    //     "title": "red line",
    //     "useLineColorForBulletBorder": true,
    //     "valueField": "value",
    //     "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
    //   } ],
    //   "chartCursor": {
    //     "pan": true,
    //     "valueLineEnabled": true,
    //     "valueLineBalloonEnabled": true,
    //     "cursorAlpha":1,
    //     "cursorColor":"#D0DD3D",
    //     "limitToGraph":"g1",
    //     "valueLineAlpha":0.2,
    //     "valueZoomable":true
    // },
    //   "categoryField": "date",
    //   "categoryAxis": {
    //     "markPeriodChange":false,
    //     "parseDates": true,
    //     "dashLength": 1,
    //     //"parseDates": true,
    //     "dateFormats":[{period:'fff',format:'JJ:NN:SS'},{period:'ss',format:'JJ:NN:SS'},{period:'mm',format:'JJ:NN'},{period:'hh',format:'JJ:NN'},{period:'DD',format:'MMM DD'},{period:'WW',format:'MMM DD'},{period:'MM',format:'MMM YYYY'},{period:'YYYY',format:'YYYY'}],
    //     "boldPeriodBeginning": true,
    //     "equalSpacing": true,
    //     "startOnAxis": true,
    //     "minorGridEnabled": true,
    //     "title": "Months"
    //   },
    //   "export": {
    //     "enabled": true
    //   },
    //   "dataProvider": [ {
    //     "date": "2017-02-27",
    //     "value": 30
    //   }, {
    //     "date": "2017-03-27",
    //     "value": 45
    //   }, {
    //     "date": "2017-04-27",
    //     "value": 55
    //   }, {
    //     "date": "2017-05-27",
    //     "value": 46
    //   }, {
    //     "date": "2017-06-27",
    //     "value": 38
    //   }, {
    //     "date": "2017-07-27",
    //     "value": 63
    //   }, {
    //     "date": "2017-08-27",
    //     "value": 22
    //   }, {
    //     "date": "2017-09-27",
    //     "value": 23
    //   }, {
    //     "date": "2017-10-27",
    //     "value": 28
    //   }, {
    //     "date": "2017-11-27",
    //     "value": 47
    //   }, {
    //     "date": "2017-12-27",
    //     "value": 36
    //   }, {
    //     "date": "2018-01-27",
    //     "value": 58
    //   }]
    // });



}

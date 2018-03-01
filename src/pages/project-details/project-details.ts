import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ProjectAnalysisPage } from '../project-analysis/project-analysis';

import { SourcePage } from '../source/source';
import { AddSourcePage } from '../add-source/add-source';
import { SourcesListPage } from '../sources-list/sources-list';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { AverageScoreServiceProvider } from '../../providers/average-score-service/average-score-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {

  private chart: AmChart;
  buildingId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private AmCharts: AmChartsService,
  public sharedService: SharedServiceProvider, public averageScoreService: AverageScoreServiceProvider, 
  public configService: ConfigServiceProvider) {
  }

  ngOnInit(){
    this.sharedService.selBuildObject = this.navParams.get('projectObject');
    this.sharedService.selBuildObjectScore = this.sharedService.check_value_null(this.sharedService.selBuildObject.scores.energy)
  }

  ngAfterViewInit(){ 

  this.averageScoreService.getAverageScore(this.configService, this.sharedService.config_header_new).subscribe((results) =>{
      for(var i = 0; i<results.length; i++){
        this.sharedService.ScoreValue[i] = results[i];
        
      }
      this.sharedService.drawComparableChart();     
  });

    
  }

  goToSourceListPage(){
    this.navCtrl.push(SourcesListPage);
  }

  goToProjectAnalysisPage(){
    this.navCtrl.push(ProjectAnalysisPage);
  }

}

import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { DomSanitizer} from '@angular/platform-browser';
import { ProjectListPage } from '../project-list/project-list';
import { FileOpener } from '@ionic-native/file-opener';
import * as $ from 'jquery';
import * as moment from 'moment-timezone';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { RegistrationServiceProvider } from '../../providers/registration-service/registration-service';
import { NewOrganizationPage } from '../new-organization/new-organization';
import { GeoServiceProvider } from '../../providers/geo-service/geo-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { ValidationServiceProvider } from '../../providers/validation-service/validation-service';

@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
})
export class AddProjectPage implements OnInit {
  

    newProject             : string;
    addProjectForm         : FormGroup;
    submitAttempt          : boolean = false;
    unitType               :any;
    selectedUnitType       :any;
    projectType            :any;
    selectedProjType       :any;
    ratingSystem           :any;
    custom_basic_config_header: any;
    selectedRatingSys      :any;
    ownerType              :any = [];
    cancellerOrganization  :any = undefined;
    errorOrganization      :any = '';
    queryOrganization      :any = '';
    all_organizations      :any = [];
    ajax_done              :boolean = false;
    searchingOrganization  :boolean = false;
    loading_org_list       :boolean = false;
    checkValue             :boolean = true;
    org_query              :any;
    file                   :any;
    selStateFlag           :boolean = true;
    countries              :any;
    states                 :any;
    data_divisions         :any;
    result                 :any;
    user_number_status     :any;
    user_number            :any;
    spaceType              :any;
    agreement_url          :any;
    SoReference            :any;
    lastModified           :any;
    submitDetaildata       :any;
    zipcodeData            :any;
    isValidZipCode         :boolean = false;
    isFormSubmitted        :boolean = false;
    sign_addendum_agreement: boolean = true;
    project_agreement_nxt_btn :any;
    project_detail_nxt_btn :any = "Create Project";
    formdata               :any ;
   
  
    constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private fileOpener: FileOpener,
    public sharedService: SharedServiceProvider, public storage: Storage, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public configService: ConfigServiceProvider, private sanitizer: DomSanitizer, public registrationService: RegistrationServiceProvider,
    public geoService: GeoServiceProvider, public authService: AuthServiceProvider, public validationService: ValidationServiceProvider) {
        
    }

    ngOnInit() {
        this.formdata={
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
            "rating_system":""  
        };

        this.addProjectForm = this.formBuilder.group({
            name: ['',Validators.compose([Validators.required, Validators.maxLength(40)])],
            untype: [''],
            projectType: [''],
            ratingSystem:[''],
            ownerType: [''],
            spaceType: [''],
            ownerCountry:[''],
            area:[''],
            privateProject: [''],
            ownerOrg:[''],
            ownerEmail:['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
            address: [''],
            city: [''],
            countryName: ['selectCountry'],
            state: ['stateSelect'],
            zipcode: ['', Validators.pattern('[0-9 ]*')],
            lat:[''],
            long:['']      
        }); 

        this.projectRegistrationFuc();
    }

    projectRegistrationFuc(){
        this.unitType = [
            {"name" : "IP","value1": "square feet", "value":"IP", "max_value": 20499999},
            {"name" : "SI", "value1": "square meters", "value":"SI","max_value": 1904514}, 
           
        ];
        this.selectedUnitType = this.unitType[0].value;      
        this.projectType = [         
            {"name":"Buildings", "value":"building"}
        ];
        this.selectedProjType= this.projectType[0].value;
        this.ratingSystem = [
            {"name":"LEED", "value":this.configService.rating_systems.building, "type": "building", "project_type": "building"},
            {"name":"Other", "value":"other", "type":"building", "project_type": "building"},
            {"name":"None", "value":"none", "type":"building", "project_type": "building"},           
        ];
        this.ownerType = [
            "Business Improvement District",
            "Community Development Corporation or Non-profit developer",
            "Corporate: Privately Held",
            "Corporate: Publicly Traded",
            "Educational: College, Private",
            "Educational: College, Public",
            "Educational: Community College, Private",
            "Educational: Community College, Public",
            "Educational: Early Childhood Education/Daycare",
            "Educational: K-12 School, Private",
            "Educational: K-12 School, Public",
            "Educational: University, Private",
            "Educational: University, public",
            "Government Use: Federal",
            "Government Use: Local, City",
            "Government Use: Local, Public Housing Authority",
            "Government Use: Other (utility, airport, etc.)",
            "Government Use: State",
            "Investor: Bank",
            "Investor: Endowment",
            "Investor: Equity Fund",
            "Investor: Individual/Family",
            "Investor: Insurance Company",
            "Investor: Investment Manager",
            "Investor: Pension Fund",
            "Investor: REIT, Non-traded",
            "Investor: REIT, Publicly traded",
            "Investor: ROEC",
            "Main Street Organization",
            "Non-Profit (that do not fit into other categories)",
            "Religious"
        ];

        this.spaceType = [
            "Airport: Control Tower", 
            "Airport: Distribution Center",
            "Airport: Hangar",
            "Airport: Office",
            "Airport: Other",
            "Airport: Public Order/Fire/Police",
            "Airport: Rental Car Center",
            "Airport: Terminal/Concourse",              
            "Airport: Vehicle Service/Repair",
            "Circulation space",
            "Core Learning Space: College/University",
            "Core Learning Space: K-12 Elementary/Middle School",
            "Core Learning Space: K-12 High School",
            "Core Learning Space: Other classroom education",
            "Core Learning Space: Preschool/Daycare",
            "Data Center",
            "Healthcare: Clinic/Other outpatient",
            "Healthcare: Inpatient",
            "Healthcare: Nursing Home/Assisted Living",
            "Healthcare: Outpatient Office (diagnostic)",
            "Industrial Manufacturing",
            "Laboratory",
            "Lodging: Dormitory",
            "Lodging: Hotel/Motel/Report, Full Service",
            "Lodging: Hotel/Motel/Resort, Limited Service",
            "Lodging: Hotel/Motel/Resort, Select Service",
            "Lodging: Inn",
            "Lodging: Other lodging",
            "Multifamily Residential: Apartment",
            "Multifamily Residential: Condominium",
            "Multifamily Residential: Lowrise",
            "Office: Administrative/Professional",
            "Office: Financial",
            "Office: Government",
            "Office: Medical (non-diagnostic)",
            "Office: Mixed Use",
            "Office: Other Office",
            "Public Assembly: Convention Center",
            "Public Assembly: Entertainment",
            "Public Assembly: Other Assembly",
            "Public Assembly: Recreation",
            "Public Assembly: Social/Meeting",
            "Public Assembly: Stadium/Arena",
            "Public Order and Safety: Fire/Police Station",
            "Public Order and Safety: Other Public Order",
            "Religious Worship",
            "Retail: Bank Branch",
            "Retail: Convenience Store",
            "Retail: Enclosed Mall",
            "Retail: Fast Food",
            "Retail: Grocery Store/Food Market",
            "Retail: Open Shopping Center",
            "Retail: Other Retail",
            "Retail: Restaurant/Cafeteria",
            "Retail: Vehicle Dealership",
            "Service: Other service",
            "Service: Post Office/Postal Center",
            "Service: Repair Shop",
            "Service: Vehicle Service/Repair",
            "Service: Vehicle Storage/Maintenance",
            "Single family home (attached)",
            "Single family home (detached)",
            "Transit: Depot",
            "Transit: Line",
            "Transit: Maintenance/Storage",
            "Transit: Office",
            "Transit: Other",
            "Transit: Station",
            "Transit: Station/Elevated", 
            "Transit: Station/Open Air Ground Level", 
            "Transit: Station/Underground", 
            "Transit: System",
            "Warehouse: Nonrefrigerated Distribution/Shipping",
            "Warehouse: Refrigerated",
            "Warehouse: Self Storage Units",
            "Warehouse: General",
            "Other"
        ];

        this.geoService.getCountryStates().subscribe((data)=>{
            this.projectregistration_updateStateData(data);         
        });  
     
        this.agreement_url = this.configService.registration_agreement;
        this.SoReference = 'REGISTRATION';
        
        this.user_number_status = true;
        this.authService.getAuth().subscribe((data) => {
            this.user_number_status = false;
            this.user_number = data.EPartner;
        },err =>{
          console.log("error in auth service");
        });

        $('#agreement_iframe').on('load', function()
        {
            $('#agreement_iframe').contents().find('#signer_name').html(this.sharedService.getUserDetail());
            $('#agreement_iframe').contents().find('#signer_id').html(this.sharedService.userDetails.user_id);
        });
    }

    projectregistration_updateStateData(data) {
      this.ajax_done = true;
      this.countries = this.sharedService.doSorting(data.countries);
      this.states = this.sharedService.doSorting(data.divisions.US); // default is US
      this.formdata.state = "DC";
      this.data_divisions = data.divisions;      
    }
    submitDetails (isValid) {
        this.isFormSubmitted = true;
        // check to make sure the form is completely valid
        
        if(this.states[0].name != 'Not Available' && this.isFormSubmitted && this.formdata.state.length == 0 || this.formdata.state == null) {
            return;
        }      
        if(this.formdata.organization.length == 0){
            return;
        }
        
        if(this.selectedProjType.value == 'empty'){
            return;
        }      
        if (isValid) {
            $("#project-details-form").addClass("not-active");
            this.project_detail_nxt_btn = "Validating info...";         
            if(this.formdata.country!="SS"){                   
                if(this.formdata.state == '' || this.formdata.state == null){
                    this.submitDetaildata = {
                        "country": this.formdata.country,
                        "zip_code": this.formdata.zip_code
                    }
                }else{
                    this.submitDetaildata = {
                        "state": this.formdata.state,
                        "country": this.formdata.country,
                        "zip_code": this.formdata.zip_code
                    }
                  }  
                //OFAC validation                
                this.http.post(this.configService.basic_api_url + '/assets/validation/', this.submitDetaildata, this.sharedService.config_header_new).map(res => res.json())
                .subscribe((data)=> {
                    $("#zip_code").removeClass("parsley-error")
                    $("#zip_code").next('ul.parsley-errors-list').remove();
                    
                    //OFAC validation starts
                    this.geoService.getCountryStates().subscribe((data)=> {
                        var org_country = this.formdata.manageEntityCountry;
                        var org_name = this.formdata.organization;
                        var org_full_country = this.sharedService.getCountryName(org_country, this.sharedService.doSorting(data.countries));
                        this.validationService.validateOrganization(org_name, org_full_country).subscribe((data)=> {
                            if(data.status){
                                if(data.is_blocked){
                                    //*******$('.ofac_invalid_modal').modal('show'); 
                                    this.project_detail_nxt_btn = "Next";
                                    $("#project-details-form").removeClass("not-active");
                                }else{
                                    // register project if not blocked
                                    this.sharedService.project_details = this.formdata;
                                    this.createProject();
                                }
                            }
                        },err=>{
                            console.log('Something went wrong. Please try again.4');
                            //remove it when api start working
                            this.sharedService.project_details = this.formdata;
                            this.createProject();
                        });                    
                    }, err=>{
                          console.log('Something went wrong. Please try again.4');
                  });
                    
                    //OFAC validation ends                  
                },err=> {
                    $("#zip_code").addClass("parsley-error");
                    if(!$("#zip_code").next('ul.parsley-errors-list').length){
                        $("#zip_code").after('<ul class="parsley-errors-list filled"><li class="parsley-required">Enter a valid zip code.</li></ul>');
                    } 
                    $("#project-details-form").removeClass("not-active");
                    this.project_detail_nxt_btn = "Next";        
                })
            }else{
                //$rootScope.appData.project_type
                this.sharedService.project_details = this.formdata;
                this.createProject();
            }
        
      }

    };


  // country state validation starts  
    validateZipCode(){
        var address = this.formdata.street + ',' + this.formdata.city + ',' + this.formdata.zip_code;
        this.isValidZipCode = false;
        if(this.formdata.country!="SS"){            
            if(this.formdata.state == '' || this.formdata.state == null){
                this.zipcodeData = {
                    "country": this.formdata.country,
                    "zip_code": this.formdata.zip_code
                }
            }else{
                this.zipcodeData = {
                    "state": this.formdata.state,
                    "country": this.formdata.country,
                    "zip_code": this.formdata.zip_code
                }
            }              
        }
        
        this.http.post(this.configService.basic_api_url + '/assets/validation/', this.zipcodeData, this.sharedService.config_header_new)
        .subscribe((data)=> {
            $("#zip_code").removeClass("parsley-error")
            $("#zip_code").next('ul.parsley-errors-list').remove();

            this.isValidZipCode = true;
        },error=> {
            this.isValidZipCode = false;
            $("#zip_code").addClass("parsley-error");
            if(!$("#zip_code").next('ul.parsley-errors-list').length){
                $("#zip_code").after('<ul class="parsley-errors-list filled mbn5"><li class="parsley-required">Enter a valid zip code.</li></ul>');
            }              
        });
    }

    updateCountry(selectedCountry){
        this.selStateFlag = true;
        var state_flag = false;   
        this.geoService.getCountryStates().subscribe((data)=>{
            for (let key in data.divisions) {
                if(selectedCountry == key){
                    state_flag = true;
                    this.states = this.sharedService.doSorting(data.divisions[key]);
                }
            }
            if(state_flag == false){
                this.states = [{code:"", name:"Not Available"}];
                this.formdata.state = "";
                this.selStateFlag = false;
            }  
        });                 
        
    }
 
    removeZipError(){
      $("#zip_code").next().remove()
      $("#zip_code").removeClass("parsley-error")
    } 

    createProject(){            
        $("#project-details-form").addClass("not-active");
        this.project_detail_nxt_btn = "Creating project...";
        
        var date_time = moment(new Date()).format("MMM DD, YYYY [at] HH:mm:ss ") +  moment().tz(moment.tz.guess()).zoneAbbr();
        
        $('#agreement_iframe').contents().find('#user_number').html(this.user_number);
        $('#agreement_iframe').contents().find('#date_time').html(date_time);
        $('#agreement_iframe').contents().find('#name').html(this.formdata.name);
        $('#agreement_iframe').contents().find('#owner_name').html(this.formdata.owner_email);
        
        var mimeType = 'text/html';
        var form_data = new FormData();
        
        var file_agreement = new File([$('#agreement_iframe').contents().find('html').html()], "agreement.html", {type: mimeType});
        form_data.append('agreement', file_agreement);

        this.sharedService.username = this.sharedService.getUserDetail();
        
        var agreement_post = 
        {
            'signer_name': this.sharedService.username,
            'signer_id': this.sharedService.userDetails.id,
            'date_time': new Date(),
            "SoReference":this.SoReference
        }   
        var data = this.sharedService.project_details;
        data['project_type']  = "building";
        if(data.confidential){
            data.leed_score_public = false;
        }
        else{
            data.leed_score_public = true;
        }
        
        this.project_agreement_nxt_btn = "Creating project...";
        for (var key in data){
            if (data.hasOwnProperty(key)) {
                form_data.append(key, data[key]);
            }
        }   
        this.project_agreement_nxt_btn = "Creating project...";
        this.custom_basic_config_header = 
        {
            headers: 
            {
                "Ocp-Apim-Subscription-Key": this.configService.subscription_key,
                "Authorization": "Bearer " + this.configService.authToken
            }
        };
        this.http.post(this.configService.basic_api_url + '/assets/', form_data, this.custom_basic_config_header).map(res => res.json()).
        subscribe((data) => {        
            this.sharedService.projectName = data.name;
            this.sharedService.selBuildObject = data;
            this.sharedService.myNewProject = data;
            this.sharedService.newAddedProjects.push(this.sharedService.myNewProject);
            console.log("project created");
            this.navCtrl.push(ProjectListPage);
        },err=>{
            $("#project-details-form").removeClass("not-active");
            this.project_detail_nxt_btn = "Next";
        });
    }

    searchOrganization(query){
        this.searchEnableOrganization();        
        this.sharedService.formdata.organization = "";
        this.all_organizations = [];
        this.loading_org_list = true;       
        this.registrationService.getOrganizations(query).subscribe((data)=>{
            this.loading_org_list = false;
            for(var i = 0; i< data.owner_type.length; i++)
            this.all_organizations.push(data.owner_type[i]);
        },
        err => {
            console.log("Error in getting organization list"+err);
        });
    };

    searchDisableOrganization(){
        this.searchingOrganization = false;
    }        
    searchEnableOrganization(){
        this.searchingOrganization = true;
    }
    selectOrganization(org){
        this.formdata.organization = org;
        this.org_query = org;
        this.searchDisableOrganization();
    };

    agreementURL() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/pdf/registration_agreement.htm');
    }

    goToAddNewOrganizationPage(){
        this.navCtrl.push(NewOrganizationPage);
    }

    addNewProject(){
        this.submitAttempt = true;
        if(!this.addProjectForm.valid){      
        }
        else {        
          //this.setAllItems();
          console.log("hello")
        }
    }

}


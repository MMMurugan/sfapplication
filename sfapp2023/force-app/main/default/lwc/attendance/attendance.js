import { LightningElement, track } from 'lwc';
// import images from "@salesforce/resourceUrl/commonImages";
// import { PAGE_TYPE} from "c/commonConstants";
import { loadStyle } from "lightning/platformResourceLoader";
import fontAwesomecss from "@salesforce/resourceUrl/fontCss";


const actions = [{
    label: 'View',
    name: 'View',
    iconName: 'utility:preview',
    target: '_self'
  },
  {
    label: 'Delete',
    name: 'Delete',
    iconName: 'utility:delete',
    target: '_self'
  },
  ];
  
  const COLUMNS =[
    {label:"S.No", fieldName : "sno", initialWidth: 100},
    {label:"Date", fieldName : "date"},
    {label:"First Name", fieldName : "firstName"},
    {label:"Last Name", fieldName : "lastName"},
    {label:"Staff", fieldName : "staff"},
    {label:"Program", fieldName : "childProgram"},
    {label:"Comments", fieldName : "comments"},
    {label:"Status", fieldName : "status"},
    {
      label: '',
      type: 'action',
      typeAttributes: {
          rowActions: actions
      },
      cellAttributes: {
          iconName: 'utility:threedots_vertical',
          iconAlternativeText: 'Actions',
          class: "tripledots tripleDot_sec_del",
      },
  }
  ]

   ///dcoument datatable
   const attdata = [
    {sno: '1', date: '10/20/2022', firstName: 'Tom', lastName:'James', staff:'Olivia', childProgram:'Child care centers', comments : 'tow was absent today', status: 'absent' },
    {sno: '2', date: '10/20/2022', firstName: 'Robert', lastName:'William', staff:'Amelia', childProgram:'Family child care homes', comments : 'tow was absent today', status: 'absent' },
    {sno: '3', date: '10/20/2022', firstName: 'Michelle', lastName:'Liam',  staff:'James', childProgram:'CCR', comments : 'tow was absent today', status: 'absent' },

   ]


   const childAttendanceColumns =[
    // {label:"S.No", fieldName : "sno", initialWidth: 60},
    {label:'Care Level', fieldName:'careLevel'},
    {label:'Child First Name', fieldName:'childFirstName', sortable: "true"},
    {label:'Child Last Name', fieldName:'childLastName', sortable: "true"},
    {label:'Applicant Name', fieldName:'applicantName'},
    {label:'Case ID', fieldName:'caseID'},
    {label:'Days Attended', fieldName:'daysAttended'},
    {label:'Total Absences', fieldName:'totalAbsences'},
]
const childAttendancedata = [
    {careLevel:'Infant', childFirstName: 'Declan ', childLastName : 'SB', applicantName: 'Therlonges, Rach Alle', caseID: 'CC-345876', daysAttended:'13', totalAbsences:'1' },
    {careLevel:'Preschool', childFirstName: 'Barrett ',childLastName:'Aubrey R', applicantName: 'Therlonges, Rach Alle', caseID: 'CC-345876', daysAttended:'14', totalAbsences:'0' },
    {careLevel:'Infant', childFirstName: 'Brown ',childLastName:'Austin M', applicantName: ' Therlonges, Rach Alle', caseID: 'CC-341001', daysAttended:'14',totalAbsences:'0' },
    {careLevel:'Infant', childFirstName: 'John',childLastName:'Wick', applicantName: ' Therlonges, Rach Alle', caseID: 'CC-341022', daysAttended:'14',totalAbsences:'0' },
]
  
const records = [{
	authRecords: {
		childFirstName: 'DECLAN',
		childLastName: 'SB',
		program: 'On My Way PRE-K',
		caseNo: '1120500',
		careLevel: 'Infant'
	},
	authDailyRecords: [{
		authDailyRecId: 1,
		day: '11/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 2,
		day: '12/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 3,
		day: '13/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 4,
		day: '14/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 5,
		day: '15/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 6,
		day: '16/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 7,
		day: '17/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 8,
		day: '18/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 9,
		day: '19/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 10,
		day: '20/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 11,
		day: '21/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 12,
		day: '22/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 13,
		day: '23/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}, {
		authDailyRecId: 14,
		day: '24/06',
		attendanceStatus: 'P',
		attendanceDisable: false
	}]
}]

export default class Attendance extends LightningElement {

    // attachmentIcon = images + "/document-file.svg";
    // uploadicon = images + "/icon-upload.svg";

    isOpenModal = false;
    showEditAttendance = false;
    showchildinfo = false;
    attendanceSummary = true;
    attendanceDetails = false;
    showSubmitAttendance = false;
    confirmModel = false;
    nodata = true;
    homeredirect = true;
    attendancedata = true;
    @track checked = true;
    popover = false;
    columns = COLUMNS;
    attendanceData = attdata;
    activeTab = 'Attendance';
    // currentPage = PAGE_TYPE.ATTENDANCE_PAGE;


    attendanceColumns = childAttendanceColumns;
    // allAttendanceData = childAttendancedata;
     allAttendanceData = records;



    handleOpenModal(){
        this.isOpenModal = true;
    }
    handleCloseModal(){
        this.isOpenModal = false;
        this.showEditAttendance = false;
        this.showchildinfo = false;
        this.confirmModel = false;
    }

       //Function used to navigate back to home screen
       handleHome() {
        const familyHome = new CustomEvent("redirecttochildcarehome", {
            detail: true
        });
        this.dispatchEvent(familyHome);
    }

    renderedCallback(){
        Promise.all([loadStyle(this, fontAwesomecss + "/css/font-awesome.min.css")]);
        if(attdata.length > 0){
            this.attendancedata = true;
            this.nodata = false;
        }
    }


    get statusOptions() {
        return [
            { label: 'All', value: 'All' }, 
            { label: 'Present', value: 'Present' },
            { label: 'Absent', value: 'Absent' },                      
            { label: 'Off Day', value: 'offday' },                      
        ];
    }

    submitStatusValue = 'NotSubmitted';

    get submitStatusOptions() {
        return [
            { label: 'All', value: 'All' },                              
            { label: 'Not Submitted', value: 'NotSubmitted' },                              
            { label: 'Submitted', value: 'Submitted' },                              
        ];
    }
    get dayOptions() {
        return [
            { label: 'Weekly', value: 'Weekly' },                              
        ];
    }

    get programTypeOptions() {
        return [
            { label: 'All', value: 'all' },
            { label: 'CCDF', value: 'CCDF' },
            { label: 'On My Way PRE-K', value: 'PREK' },                      
        ];
    }
    get careleveleOptions() {
        return [
            { label: 'All', value: 'all' },
            { label: 'Pre School', value: 'pre school' },
            { label: 'Infant', value: 'Infant' },                      
            { label: 'Toddler', value: 'Toddler' },                      
        ];
    }
    
    get attendanceOptions() {
        return [
            { label: 'Present', value: 'Present' },
            { label: 'Absent', value: 'Absent' },                      
            { label: 'Off Day', value: 'offday' },
        ];
    }

    viewAttendanceDetail(){
        this.attendanceSummary = false;
        this.attendanceDetails = true;
    }

    backtoAttendanceDashboard(){    
        this.attendanceDetails = false;
        this.attendanceSummary = true;
    }
 
    changeToggle(event){
        this.checked = !this.checked;
    }
    
    openEditAttendance(){
        // this.showEditAttendance = true;
        this.popover= true;
    }
    popovercloase(){
        this.popover= false;
    }

    openchildinfo(){
        this.showchildinfo = true;
    }
    submitAttendance(){
        this.attendanceDetails = false;
        this.showSubmitAttendance = true;
    }
    backtoAttendanceDetails(){
        this.showSubmitAttendance = false;
        this.attendanceDetails = true;        
    }
    
    submitMethod(){
        this.confirmModel = true;
    }

    get language() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' }
        ];
    }

}
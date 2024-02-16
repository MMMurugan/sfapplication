import { LightningElement, track, wire } from 'lwc';
import fetchCaseDetails from '@salesforce/apex/CaseManager.fetchCaseDetails';
import closeCase from '@salesforce/apex/CaseManager.closeCase';

export default class CaseManager extends LightningElement {

@track searchCaseNumber;
@track caseList;
errorDetails;
caseCloseMessage;
    // @wire(fetchCaseDetails)
    //     caseDetails;
    

    // onchange case number 
    caseNumberChange(event){
        this.searchCaseNumber = event.target.value;
        console.log("search case number", this.searchCaseNumber);

        fetchCaseDetails({caseNumber:this.searchCaseNumber})
        .then(result=>{
            this.caseList = result;
        })
        .catch(error=>{
            this.errorDetails = error; 
        })
    }

    // close case action
    passCaseToClose(event){
     this.caseId = event.target.name;
     closeCase({caseId:this.caseId})
     .then(result=>{
        this.caseCloseMessage = result;

     })
     .catch(error=>{
        this.errorDetails = error;
     })
    }
}
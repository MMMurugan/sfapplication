import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// import fetchAllAccounts from '@salesforce/apex/CorporateInformation.fetchAllAccounts';

import CORPORATE_INFO_OBJECT from '@salesforce/schema/CorporateInformation__c';
import NAME_FIELD from '@salesforce/schema/CorporateInformation__c.Name__c';
import PHONE_FIELD from '@salesforce/schema/CorporateInformation__c.Phone__c';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/CorporateInformation__c.AccountNumber__c';
import WEBSITE_FIELD from '@salesforce/schema/CorporateInformation__c.Website__c';
import DESCRIPTION_FIELD from '@salesforce/schema/CorporateInformation__c.Description__c';
import RATING_FIELD from '@salesforce/schema/CorporateInformation__c.Rating__c';
import TYPE_FIELD from '@salesforce/schema/CorporateInformation__c.Type__c';

import { utils } from 'c/utils';
export default class CorporateInfo extends LightningElement {

    // @wire(fetchAllAccounts)
    // allAccounts;
    corporateInfoObj = [];

    // getRECS = {
    //     Name: "",
    //     Phone:"",
    //     AccountNumber: "",
    //     Website: "",
    //     Description:"",
    //     Rating:"",
    //     Type:""
    //   };

    //   handleChange(event){
    //     if(event.target.name == "Name"){
    //         this.getRECS.Name = event.target.value;
    //     }else if(event.target.Website == "Website"){
    //         this.getRECS.Website = event.target.value;
    //     }          
    //   }

    //   if (this.getREC1 && !this.getREC1.Name)
    //   return this.dispatchEvent(utils.toastMessage("Provider Corporate Name is mandatory", "warning"));

    // if (this.getREC1 && !this.getREC1.FirstName__c)
    //   return this.dispatchEvent(utils.toastMessage("First Name is mandatory", "warning"));


    //Application Object Fields On Change Method
  
    handleChange(event) {
    let value = event.detail.value ? event.detail.value : event.target.value;
    let name = event.target.name;
    //let checked = event.target.checked;

    switch (name) {
        case "Name":
            this.corporateInfoObj.Name = value;
            break;       
        case "Phone":
            this.corporateInfoObj.Phone = value;
            break;
        case "AccountNumber":
            this.corporateInfoObj.AccountNumber = value;
            break;
        case "Website":
            this.corporateInfoObj.Website = value;
            break;
        case "Description":
            this.corporateInfoObj.Description = value;
            break;
        case "Rating":
            this.corporateInfoObj.Rating = value;
            break;
        case "Type":
            this.corporateInfoObj.Type = value;
            break;      
    }
  }

  // handleSave(){
  //     if(this.getRECS && !this.getRECS.Name)   
  //     return this.dispatchEvent(utils.toastMessage("Name is mandatory", "warning"));

  //     if(this.getRECS && !this.getRECS.Website)   
  //     return this.dispatchEvent(utils.toastMessage("Website is mandatory", "warning"));

  //     let _insertValuesForAccount={};
  //       _insertValuesForAccount.sobjectType=ACCOUNT_OBJECT.objectApiName;
  //       _insertValuesForAccount.Id=this.getRECS.Id;
  //       _insertValuesForAccount[ACCOUNT_NAME_FIELD.fieldApiName]=this.getRECS.Name;
  //       _insertValuesForAccount[ACCOUNT_WEBSITE_FIELD.fieldApiName]=this.getRECS.Website;
  // }


  handleSave(){
    let fields = {}

    fields[NAME_FIELD.fieldApiName] = this.corporateInfoObj.Name;
    fields[PHONE_FIELD.fieldApiName] = this.corporateInfoObj.Phone;
    fields[ACCOUNT_NUMBER_FIELD.fieldApiName] = this.corporateInfoObj.AccountNumber;
    fields[WEBSITE_FIELD.fieldApiName] = this.corporateInfoObj.Website;
    fields[DESCRIPTION_FIELD.fieldApiName] = this.corporateInfoObj.Description;
    fields[RATING_FIELD.fieldApiName] = this.corporateInfoObj.Rating;
    fields[TYPE_FIELD.fieldApiName] = this.corporateInfoObj.Type;

    const recordInput ={apiName: CORPORATE_INFO_OBJECT.objectApiName, fields};

    createRecord(recordInput)
    .then(result => {
   //   this.accountId = result.id;
      this.dispatchEvent(
          new ShowToastEvent({
              title: 'Success',
              message: 'corporate Information created',
              variant: 'success',
          }),
      );
  })
    .catch(error =>{

    })
  }

  
}
import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/LearnAccountDetails.getAllAccountDetails';

//data table method call
import getAllAccountDataList from '@salesforce/apex/LearnAccountDetails.getAllAccountDataList';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_ACCNUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';
import ACCOUNT_WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import ACCOUNT_DESCRIPTION_FIELD from '@salesforce/schema/Account.Description';
import ACCOUNT_RATING_FIELD from '@salesforce/schema/Account.Rating';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';

const columns =[
  {label: 'Account name', fieldName: 'Name'},
  {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency',
    cellAttributes:{
      class:{fieldName:'amountColor'},
      iconName:{fieldName: 'iconName'},
      iconPosition:'right',
    }
  },
  {label: 'Industry', fieldName: 'Industry', },
  {label: 'Phone', fieldName: 'Phone', type: 'phone'}
]


export default class LearnAccoutDetails extends LightningElement {
// @wire(getAllAccounts)
// allAccounts;


Name;
Phone;
AccountNumber;
Website;
Description;
Rating;
Type;
tableDatamm;

//table data 

tableData;
tableColumns = columns;


accountId = '0012w0000042lGZAAY';

connectedCallback() {
    this.fetchdata();
}


fetchdata(){
    getAllAccounts
    ({
        accountData : this.accountId
    }).then(result => {
       console.log('mmmmmmmmmmm11111111', result[0]);
        this.Id = result[0].Id;
        this.Name = result[0][ACCOUNT_NAME_FIELD.fieldApiName];
        this.Phone = result[0][ACCOUNT_PHONE_FIELD.fieldApiName];
        this.AccountNumber = result[0][ACCOUNT_ACCNUMBER_FIELD.fieldApiName];
        this.Website = result[0][ACCOUNT_WEBSITE_FIELD.fieldApiName];
        this.Description = result && result[0][ACCOUNT_DESCRIPTION_FIELD.fieldApiName];
        this.Rating = result[0][ACCOUNT_RATING_FIELD.fieldApiName];
        this.Type = result[0][ACCOUNT_TYPE_FIELD.fieldApiName];
    })
}


  //  Values change func
  handleChange(event) {
    const name = event.target.name;
    switch (name) {
      case 'Name': 
        this.Name = event.target.value;
        break;
      case 'Staff': 
        this.Staff = event.target.value;
        break;
      case 'Capacity': 
        this.Capacity = event.target.value;
        break;
      case 'Aboutus': 
        this.Aboutus = event.target.value;
        break;
      case 'Website': 
        this.Website = event.target.value;
        break;
      case 'Gender': 
        this.Gender = event.target.value;
        break;
      case 'MaxEnrollement': 
        this.TotalEnrollment = event.target.value;
        break;
      case 'TotalNumberofProgram': 
        this.TotalNumberofProgram = event.target.value;
        break;
      default:
        break;
    }

   }

   //Data Table values

@wire(getAllAccountDataList)
accountDataList(result, error){
  console.log("mmmm", result);
  if(result.data){
    // this.tableData = result.data;
    // console.log("table data", this.tableData);
    this.tableData= result.data.map(item => {
     let amountColorm = item.AnnualRevenue < 500000000 ? "slds-text-color_error" : "slds-text-color_success";
     let iconName = item.AnnualRevenue < 500000000 ? "utility:down" : "utility:up";
      return{...item,
        "amountColor":amountColorm,
        "iconName":iconName
      };
    })
  }
 
 if(error){
   console.error(error);
 }
} 

}
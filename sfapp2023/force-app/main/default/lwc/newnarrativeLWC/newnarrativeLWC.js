import { LightningElement, track } from 'lwc';
//import CONTACT_OBJECT from '@salesforce/schema/Contact';

// import server side apex class method 
// import accountObject from '@salesforce/schema/Account';
//import createContact from '@salesforce/apex/newintakeController.createContact';
//import saveContact from '@salesforce/apex/newIntakeController.saveContactRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';


export default class newnarrativeLWC extends LightningElement {
    @track error;
    contRecord = {
        FirstName: FIRSTNAME_FIELD,
        LastName: LASTNAME_FIELD
    }

    changeFirstHandler(event) {
        this.contRecord.FirstName = event.target.value;
        //alert(this.contRecord.FirstName);
        // window.console.log('FirstName ==> ' + this.contRecord.FirstName);
    }
    changeLastHandler(event) {
        this.contRecord.LastName = event.target.value;
        //window.console.log('LastName ==> ' + this.contRecord.LastName);
    }
    handleSave() {
        //alert('test1' + this.contRecord);
        saveContact({ objCont: this.contRecord })
            .then(result => {
                //alert('test2' + result);
                // Clear the user enter values
                this.contRecord = {};

                // window.console.log('result ===> ' + result);
                // Show success messsage
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Contact Created Successfully!!',
                    variant: 'success'
                }), );
            })
            .catch(error => {
                //alert('test3');
                this.error = error.message;
            });
    }
}



//@track: Marks a property for internal monitoring. A template or function using- 
//this property forces a component to rerender when the property’s value changes.
// @track nwIntake;
// @track newQContact;
// @track newQContact;
// @track conList;
// @track CaseNum;
// @track QuickContactLst;
// @track ShowQuickPersonData = 'false';
// @track CommPicklist;
// @track purposePicklist;
// @track RolePicklist;
// @track StatePicklist;
// @track CountryPicklst;
// @track api;


//     accountObject = accountObject;
//     myFields = [title, firstname, middlename];

//     handleSubmit() {

//     }
//     handleSuccess() {

//     }
// }



// call apex method on button click 
// handleLoad() {
//     createContact()
//         .then(result => {
//             this.contacts = result;
//             this.error = undefined;
//         })
//         .catch(error => {
//             this.error = error;
//             this.contacts = undefined;
//         });
// };
// changeHandler(event) {
//     this.eventname = event.target.name;
//     this.selectedOption = event.target.value;
//     this.FirstName = '';
//     this.MiddleName = '';
//     this.Organization = '';
//     this.Email = '';
//     this.City = '';
//     this.State = '';
//     this.Country = '';
//     this.UnknownReporter = '';
//     this.Acknowledgment = '';
//     this.DOB = '';
//     this.Gender = '';
//     this.Age = '';
//     this.SSN = '/
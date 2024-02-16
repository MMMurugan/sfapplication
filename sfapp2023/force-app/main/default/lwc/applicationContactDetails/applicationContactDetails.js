import { LightningElement, track, wire, api } from 'lwc';
import getAllContactDetails from "@salesforce/apex/applicationContactDetailsAddOrEdit.getAllContactDetails";
import editContactDetails from "@salesforce/apex/applicationContactDetailsAddOrEdit.editContactDetails";
import { loadStyle } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/styleSheet';
import { refreshApex } from "@salesforce/apex";

import images from '@salesforce/resourceUrl/images';
import { utils } from 'c/utils';

import { getPicklistValuesByRecordType, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";

import CONTACTNOTES_OBJECT from '@salesforce/schema/ContactNotes__c';
import ID_FIELD from '@salesforce/schema/ContactNotes__c.Id';
import CONTACTTYPE_FIELD from '@salesforce/schema/ContactNotes__c.ContactType__c';
import LOCATION_FIELD from '@salesforce/schema/ContactNotes__c.Location__c';
import PURPOSE_FIELD from '@salesforce/schema/ContactNotes__c.Purpose__c';
import DATE_FIELD from '@salesforce/schema/ContactNotes__c.Date__c';
import TIME_FIELD from '@salesforce/schema/ContactNotes__c.Time__c';
import CONTACTNAME_FIELD from '@salesforce/schema/ContactNotes__c.ContactName__c';
import CONTACTROLE_FIELD from '@salesforce/schema/ContactNotes__c.ContactRole__c';
import PHONE_FIELD from '@salesforce/schema/ContactNotes__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/ContactNotes__c.Email__c';
import NARRATIVE_FIELD from '@salesforce/schema/ContactNotes__c.Narrative__c';



const actions = [
    { label: 'Edit', name: 'Edit', iconName: 'utility:edit', target: '_self' },
    { label: 'View', name: 'View', iconName: 'utility:preview', target: '_self' },
    { label: 'Delete', name: 'Delete', iconName: 'utility:delete', target: '_self' }
];

const columns = [
    { label: 'MODE OF CONTACT', fieldName: 'ContactType__c', type: 'text', sortable: true, initialWidth: 170 },
    { label: 'LOCATION', fieldName: 'Location__c', type: 'text', sortable: true },
    { label: 'PURPOSE', fieldName: 'Purpose__c', type: 'text', sortable: true },
    { label: 'DATE & TIME', fieldName: 'DateTime', type: 'text', initialWidth: 170 },
    { label: 'CONTACT NAME', fieldName: 'ContactName__c', type: 'text', sortable: true },
    { label: 'CONTACT ROLE', fieldName: 'ContactRole__c', type: 'text', sortable: true },
    { label: 'PHONE', fieldName: 'Phone__c', type: 'text' },
    { label: 'EMAIL', fieldName: 'Email__c', type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
        cellAttributes: {
            iconName: 'utility:threedots_vertical',
            iconAlternativeText: 'Actions',
            class: "tripledots"
        },
    }
];

export default class ApplicationContactDetails extends LightningElement {
    @track columns = columns;
    @track contactDetails = {};
    @track noRecordsFound = false;

    //Pagination
    @track totalContactsCount = 0;
    @track totalContacts = [];
    @track page = 1;
    @track currentPageContactData;
    setPagination = 5;
    perpage = 10;    

    //Sort Function
    @track defaultSortDirection = 'asc';
    @track sortDirection = 'asc';
    @track sortedBy = "ContactType__c";


    @track openModel = false;
    @track deleteModel = false;
    @track viewModel = false;
    @track deleteId;

    @track disabled = false;
    @track freezeContactScreen = false;
    
    @api recordId;
    // applicationId = 'mm10000';

    // applicationforApiCall = this.applicationId;
    wiredContactDetails;
    contactId;


    renderedCallback() {
        Promise.all([
            loadStyle(this, myResource + '/style1.css'),
        ])
    }

    // get applicationId() {
    //     return this.applicationId;
    // }
      //Get List Table Values
  
      @wire(getAllContactDetails)
    allContactData(result) {
        this.wiredContactDetails = result;
        console.log("1111111",+JSON.stringify(this.wiredContactDetails), this.wiredContactDetails, this.applicationforApiCall )
        if (result.data) {
            
            this.totalContactsCount = result.data.length;
            console.log("2222",+JSON.stringify(this.totalContactsCount), this.totalContactsCount )

            if (this.totalContactsCount == 0)
                this.noRecordsFound = true;
            else
                this.noRecordsFound = false;
                console.log("get",+JSON.stringify(this.totalContactsCount), this.totalContactsCount )

            this.totalContacts = result.data.map(row => {
                return {
                    Id: row.Id,
                    ContactType__c: row.ContactType__c,
                    Location__c: row.Location__c,
                    Purpose__c: row.Purpose__c,
                    DateTime: utils.formatDate(row.Date__c) + ' ' + utils.formatTime12Hr(row.Time__c),
                    ContactName__c: row.ContactName__c,
                    ContactRole__c: row.ContactRole__c,
                    Phone__c: row.Phone__c,
                    Email__c: row.Email__c
                }
            });

            this.pageData();
            refreshApex(this.wiredContactDetails);
        }
    }

    //Pagination
    pageData() {
        let page = this.page;
        let perpage = this.perpage;
        let startIndex = (page * perpage) - perpage;
        let endIndex = (page * perpage);
        this.currentPageContactData = this.totalContacts.slice(startIndex, endIndex);

        if (this.currentPageContactData.length == 0) {
            if (this.page != 1) {
                this.page = this.page - 1;
                this.pageData();
            }
        }
    }


    openAddContactModel(){
    this.openModel = true;
    }

    closeModel(){
        this.openModel = false;
    }


 //Get Object Info
 @wire(getObjectInfo, {
    objectApiName: CONTACTNOTES_OBJECT
})
objectInfo;

     //Get PickList Values from Object
     @wire(getPicklistValuesByRecordType, {
        objectApiName: CONTACTNOTES_OBJECT,
        recordTypeId: '$objectInfo.data.defaultRecordTypeId'
    })
    wiredPicklistValues({ error, data }) {
        if (data) {

            //Getting Contact Type Custom field Picklist Values
            this.contactTypeOptions = data.picklistFieldValues.ContactType__c.values.map(key => {
                return {
                    label: key.label,
                    value: key.value
                }
            });

            //Getting Location Custom field Picklist Values
            this.locationOptions = data.picklistFieldValues.Location__c.values.map(key => {
                return {
                    label: key.label,
                    value: key.value
                }
            });

            //Getting Purpose Custom field Picklist Values
            this.purposeOptions = data.picklistFieldValues.Purpose__c.values.map(key => {
                return {
                    label: key.label,
                    value: key.value
                }
            });

            //Getting Contact Role Custom field Picklist Values
            this.roleOptions = data.picklistFieldValues.ContactRole__c.values.map(key => {
                return {
                    label: key.label,
                    value: key.value
                }
            });
        } else {
            this.dispatchEvent(utils.toastMessage("Error in fetching Picklist Values"), "error");
        }
    }

       //Fields On Change Event Handler
       contactOnChange(event) {
        if (event.target.name == 'ContactType') {
            this.contactDetails.ContactType__c = event.detail.value;
        } else if (event.target.name == 'Location') {
            this.contactDetails.Location__c = event.detail.value;
        } else if (event.target.name == 'Purpose') {
            this.contactDetails.Purpose__c = event.detail.value;
        } else if (event.target.name == 'Date') {
            this.contactDetails.Date__c = event.target.value;
        } else if (event.target.name == 'Time') {
            this.contactDetails.Time__c = event.target.value;
        } else if (event.target.name == 'ContactName') {
            this.contactDetails.ContactName__c = event.target.value;
        } else if (event.target.name == 'ContactRole') {
            this.contactDetails.ContactRole__c = event.detail.value;
        } else if (event.target.name == 'Phone') {
            event.target.value = event.target.value.replace(/(\D+)/g, '');
            this.contactDetails.Phone__c = utils.formattedPhoneNumber(event.target.value);
        } else if (event.target.name == 'Email') {
            this.contactDetails.Email__c = event.target.value;
        } else if (event.target.name == 'Narrative') {
            this.contactDetails.Narrative__c = event.target.value;
        }
    }

        //Create or Update Contact Details
    saveContactDetails() {
        this.disabled = true;

        const allValid = [
            ...this.template.querySelectorAll('lightning-input'),
            ...this.template.querySelectorAll('lightning-combobox')
        ]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);

        if (allValid) {
            // console.log("test")
            if (this.contactDetails && this.contactDetails.Phone__c && this.contactDetails.Phone__c.length != 14) {
                this.disabled = false;
                return this.dispatchEvent(utils.toastMessage("Invalid Phone", "warning"));
            }

            const fields = {};
            // console.log("test1111" +JSON.stringify(this.contactDetails))
            fields[CONTACTTYPE_FIELD.fieldApiName] = this.contactDetails.ContactType__c;
            fields[LOCATION_FIELD.fieldApiName] = this.contactDetails.Location__c;
            fields[PURPOSE_FIELD.fieldApiName] = this.contactDetails.Purpose__c;
            fields[DATE_FIELD.fieldApiName] = this.contactDetails.Date__c;
            fields[TIME_FIELD.fieldApiName] = this.contactDetails.Time__c;
            fields[CONTACTNAME_FIELD.fieldApiName] = this.contactDetails.ContactName__c;
            fields[CONTACTROLE_FIELD.fieldApiName] = this.contactDetails.ContactRole__c;
            fields[PHONE_FIELD.fieldApiName] = this.contactDetails.Phone__c;
            fields[EMAIL_FIELD.fieldApiName] = this.contactDetails.Email__c;
            fields[NARRATIVE_FIELD.fieldApiName] = this.contactDetails.Narrative__c;
            // fields[APPLICATION_FIELD.fieldApiName] = this.applicationforApiCall;

            
            if (!this.contactId) {
                const recordInput = {
                    apiName: CONTACTNOTES_OBJECT.objectApiName,
                    fields
                };

                createRecord(recordInput)
                    .then(result => {
                        this.openModel = false;
                        this.contactDetails = {};
                        this.contactId = null;
                        this.dispatchEvent(utils.toastMessage("Contact Notes has been saved successfully", "success"));
                        this.disabled = false;

                        return refreshApex(this.wiredContactDetails);
                    })
                    .catch(error => {
                        this.disabled = false;
                        this.dispatchEvent(utils.toastMessage("Error in saving Contact Details. Please check.", "error"));
                    })
            } else {
                fields[ID_FIELD.fieldApiName] = this.contactId;

                const recordInput = { fields };

                updateRecord(recordInput)
                    .then(() => {
                        this.openModel = false;
                        this.contactDetails = {};
                        this.contactId = null;
                        this.disabled = false;
                        this.dispatchEvent(utils.toastMessage("Contact Notes has been saved successfully", "success"));
                        return refreshApex(this.wiredContactDetails);
                    })
                    .catch(error => {
                        this.disabled = false;
                        this.dispatchEvent(utils.toastMessage("Error in saving Contact Details. Please check.", "error"));
                    })
            }
        } else {
            console.log("error")
            this.disabled = false;
            this.dispatchEvent(utils.toastMessage("Error in saving Contact Details. Please check.", "error"));
        }
    }

      //Edit/Delete Model Action
      handleRowAction(event) {
        if (event.detail.action.name == 'Edit' || event.detail.action.name == 'View') {
            if (this.freezeContactScreen && event.detail.action.name == 'Edit')
                return this.dispatchEvent(utils.toastMessage(`Cannot edit contact notes for ${this.finalStatus} application`, "warning"));

            let selectedContactId = event.detail.row.Id;

            this.openModel = event.detail.action.name == 'Edit' ? true : false;
            this.viewModel = event.detail.action.name == 'View' ? true : false;
            this.title = event.detail.action.name == 'Edit' ? 'EDIT CONTACT DETAILS' : this.title;

            this.disabled = false;

            editContactDetails({
                selectedContactId
            })
                .then(result => {
                    if (result.length > 0) {
                        this.contactDetails = {
                            ContactType__c: result[0].ContactType__c,
                            Location__c: result[0].Location__c,
                            Purpose__c: result[0].Purpose__c,
                            Date__c: result[0].Date__c,
                            Time__c: utils.formatTime24Hr(result[0].Time__c),
                            ContactName__c: result[0].ContactName__c,
                            ContactRole__c: result[0].ContactRole__c,
                            Email__c: result[0].Email__c,
                            Phone__c: result[0].Phone__c,
                            Narrative__c: result[0].Narrative__c
                        };
                        this.contactId = result[0].Id;
                    } else {
                        this.dispatchEvent(utils.toastMessage("Error in getting contact details", "error"));
                    }
                })
                .catch(error => {
                    this.dispatchEvent(utils.toastMessage("Error in getting contact details", "error"));
                })
        } else if (event.detail.action.name == 'Delete') {
            if (this.freezeContactScreen)
                return this.dispatchEvent(utils.toastMessage(`Cannot delete contact notes for ${this.finalStatus} application`, "warning"));

            this.deleteModel = true;
            this.deleteId = event.detail.row.Id;
        }
    }
    handleDelete() {
        deleteRecord(this.deleteId)
            .then(() => {
                console.log('delete record ');
                this.deleteModel = false;
                this.dispatchEvent(utils.toastMessage('Contact Details deleted successfully', "success"));

                return refreshApex(this.wiredContactDetails);
            })
            .catch(error => {
                this.deleteModel = false;
                this.dispatchEvent(utils.toastMessage("Error in delete contact details", "error"));

                return refreshApex(this.wiredContactDetails);
            });
    }
   
     //Cancel Contact Model Box
     cancelContactDetails() {
        this.contactDetails = {};
        this.openModel = false;
        this.viewModel = false;
        this.contactId = null;
    }

    //Close Contact Model Box
    closeContactModel() {
        this.contactDetails = {};
        this.openModel = false;
        this.viewModel = false;
    }

}
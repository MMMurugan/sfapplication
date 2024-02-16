import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord} from "lightning/uiRecordApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// Object and fields 
import WORK_ORDER_OBJECT from '@salesforce/schema/WorkOrderItem__c';
import STATUS_FIELD from '@salesforce/schema/WorkOrderItem__c.Status__c';
import WORK_ORDER_NAME_FIELD from '@salesforce/schema/WorkOrderItem__c.WorkOrderName__c';
import WORK_ORDER_DATE_FIELD from '@salesforce/schema/WorkOrderItem__c.WorkOrderDate__c';
import ASSIGNED_USER_FIELD from '@salesforce/schema/WorkOrderItem__c.AssignedUser__c';
import ACCOUNT_FIELD from '@salesforce/schema/WorkOrderItem__c.Account__c';
import TOTAL_QUANTITY_FIELD from '@salesforce/schema/WorkOrderItem__c.TotalQuantity__c';
import TOTAL_ITEM_FIELD from '@salesforce/schema/WorkOrderItem__c.TotalItemsAdded__c';
import DESCRIPTION_FIELD from '@salesforce/schema/WorkOrderItem__c.Description__c';
//apex import 
import getWorkOrdersValues from '@salesforce/apex/WorkOrders.getWorkOrdersValues';



export default class WorkOrders extends LightningElement {

@api recordId;
statusPicklist;
woItem;
woItemlength;
records;
ParentValue;
isdisable = true;

 workOrderinfoObj= [];

@wire(getObjectInfo,{ objectApiName: WORK_ORDER_OBJECT })
workOrderinfo

// getting rating picklist values
    @wire(getPicklistValues,
        {
            recordTypeId: '$workOrderinfo.data.defaultRecordTypeId', 
            fieldApiName: STATUS_FIELD
        }
    )

    statusPicklist({data, error}){
        if(data){
            console.log('Picklist values are', data.values);
            this.statusPicklist = data.values;
        }
        if(error){
            console.log(`Error while Picklist values are ${error}`);
        }
    }


    connectedCallback(){
        this.workOrderItems()
    }

// getting data using imperatively 
    workOrderItems(){
        getWorkOrdersValues()
        .then(result => {
            console.log("result", result[0]);   
           
            this.workOrderinfoObj.workOrderName = result[0].WorkOrderName__c;
            this.workOrderinfoObj.workOrderDate = result[0].WorkOrderDate__c;
            this.workOrderinfoObj.assignedUser = result[0].AssignedUser__c;
            this.workOrderinfoObj.assignedUserName = result[0].AssignedUser__r.Name;
            this.workOrderinfoObj.account = result[0].Account__c;
            this.workOrderinfoObj.accountName = result[0].Account__r.Name;
            this.workOrderinfoObj.totalQuantity = result[0].TotalQuantity__c;
            this.workOrderinfoObj.totalItems = result[0].TotalItemsAdded__c;
            this.workOrderinfoObj.status = result[0].Status__c;
            this.workOrderinfoObj.description = result[0].WorkOrderDate__c;
            
           // this.woItemlength = result.length;

            //console.log("length", woItemlength);

             this.ParentValue = result[0];
            this.ParentValue111 = "murgan w f kkfgsdkfgdfda";
            console.log("0000000000", this.ParentValue111);

                    // create custom Event
                    const parentList = new CustomEvent("getwoinfo",
                    {
                        detail: 
                        {
                            name: this.ParentValue
                        }
                        });

                    // Dispatch Event 
                    this.dispatchEvent(parentList);


            console.log("muuuuuu", parentList.detail);

            // if(!result[0]){
            //     this.isdisable = true;
            // }
            
        })
        .catch(error => {
            console.log("error", error);
        });
    }

// gettimg data using wire method
    @wire(getWorkOrdersValues)
    getWorkOrdersItems({data, error}){
        if(data){
            this.records = data;
            console.log("methord2", this.records);
        }
        else if(error)
        {
            console.log("error", error);
        }
    }

    // on change event 
    handleOnChange(event){
        let value = event.detail.value ? event.detail.value : event.target.value;
        let name = event.target.name;
        let checked = event.target.checked;

        switch(name){
            case 'workOrderName':
                this.workOrderinfoObj.workOrderName = value;
                break;
            case 'workOrderDate':
                this.workOrderinfoObj.workOrderDate = value;
                break;
                // lookup selecton 
            // case "assignedUser":
            //     this.workOrderinfoObj.assignedUser = value;
            //     break;
            // case "account":
            //     this.workOrderinfoObj.account = value;
            //     break;            
            case "totalQuantity":
                this.workOrderinfoObj.totalQuantity = value;
                break;
            case "totalItems":
                this.workOrderinfoObj.totalItems = value;
                break; 
            case "status":
                this.workOrderinfoObj.status = value;
                break; 
            case "description":
                this.workOrderinfoObj.description = value;
                break;
        }
    }

//lookup selection
    handleuserSelection(event){
        console.log("the selected record id is"+ JSON.stringify(event));       
        this.workOrderinfoObj.userSelectedValue = event.detail.selectedId; 
    }
    handleAccountSelection(event){
        console.log("the selected record id is"+event.detail);       
        this.workOrderinfoObj.accountSelectedValue = event.detail.selectedId; 
    }

      
    // work order fields value save
    workOrderFormSave(){
        console.log("save", this.workOrderinfoObj);
        this.resultmm = this.workOrderinfoObj;

        let fields  = {};

        fields[WORK_ORDER_NAME_FIELD.fieldApiName] = this.workOrderinfoObj.workOrderName;
        fields[WORK_ORDER_DATE_FIELD.fieldApiName] = this.workOrderinfoObj.workOrderDate;
        fields[ASSIGNED_USER_FIELD.fieldApiName] = this.workOrderinfoObj.userSelectedValue;
        fields[ACCOUNT_FIELD.fieldApiName] = this.workOrderinfoObj.accountSelectedValue;
        fields[TOTAL_QUANTITY_FIELD.fieldApiName] = this.workOrderinfoObj.totalQuantity;
        fields[TOTAL_ITEM_FIELD.fieldApiName] = this.workOrderinfoObj.totalItems;
        fields[STATUS_FIELD.fieldApiName] = this.workOrderinfoObj.status;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.workOrderinfoObj.description;

        const recordInput = {apiName: WORK_ORDER_OBJECT.objectApiName, fields };        

        // update record
        console.log('fields',fields);
        
        if(this.workOrderItems >0){
            console.log("nnnnnn");
        }

        // create record
        createRecord(recordInput)         
            .then(result =>{
             // this.recordId = result.id;
               console.log('fields', this.recordId);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Work Order Item Added Successfully',
                        variant: 'success',
                    }),
                );

            })
            .catch(error =>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            })

    }

}
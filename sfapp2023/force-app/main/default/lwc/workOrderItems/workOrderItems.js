import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import Apex class 
import getWorkOrdersValues from '@salesforce/apex/WorkOrders.getWorkOrdersValues';

// import Object and fields 
import WORK_ORDER_OBJECT from '@salesforce/schema/WorkOrderItem__c';
import STATUS_FIELD from '@salesforce/schema/WorkOrderItem__c.Status__c';

export default class WorkOrderItems extends LightningElement {

    showDataTable = true;
    showAddItems = false;
    statusPicklist;
    woNumber;
    item;
    error;
    @api getValueFromParent;
    @api recordId;
    @api parentinfomm;

    workOrderItemsList = [];

    addWorkOrderItem(){
        console.log('mmmmmmm');
        this.showDataTable = false;
        this.showAddItems = true;
    }

    connectedCallback(){
        this.workOrderItems();
        console.log("parent info", JSON.stringify(this.parentinfomm));
    }

// fetch picklist values
@wire(getObjectInfo,{ objectApiName: WORK_ORDER_OBJECT })
workOrderIteminfo;

@wire(getPicklistValues,
    {
        recordTypeId: '$workOrderIteminfo.data.defaultRecordTypeId', 
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

handleAccountSelection(event){
    console.log("the selected record id is"+event.detail);       
    this.woNumber = event.detail; 
    console.log("mmmmmmmmmmmm", this.woNumber);
}

//********************************************************* */


    // workOrderItems(){
    //     getWorkOrdersValues()
    //     .then(result => {
    //         this.item = result;
    //         this.error = undefined;
    //         console.log("result1111111111111", this.item);
    //     })
    //     .catch(error => {
    //         this.error = error;
    //         this.contacts = undefined;
    //     });
    // }
   

    // getting data using imperatively 
    workOrderItems(){
        getWorkOrdersValues()
        .then(result => {
            console.log("result", result[0]);   
           
            this.workOrderItemsList.woNumber = result[0].Id;

            // this.workOrderinfoObj.workOrderDate = result[0].WorkOrderDate__c;
            // this.workOrderinfoObj.assignedUser = result[0].AssignedUser__c;
            // this.workOrderinfoObj.account = result[0].Account__c;
            // this.workOrderinfoObj.totalQuantity = result[0].TotalQuantity__c;
            // this.workOrderinfoObj.totalItems = result[0].TotalItemsAdded__c;
            // this.workOrderinfoObj.status = result[0].Status__c;
            // this.workOrderinfoObj.description = result[0].WorkOrderDate__c;
            
           // this.woItemlength = result.length;

            //console.log("length", woItemlength);

            // this.ParentValue = result[0];
            // console.log("0000000000", this.ParentValue);
            console.log("mssssssssssss", this.workOrderItemsList.woNumber);
            if(!result[0]){
                this.isdisable = true;
            }
            
        })
        .catch(error => {
            console.log("error", error);
        });
    }


}
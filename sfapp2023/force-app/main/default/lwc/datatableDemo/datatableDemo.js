import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/tableController.getAccounts';

const COLUMNS = [
    {label:"Account Name", fieldName:"Name"},
    {label:"Annual Revenue", fieldName:"AnnualRevenue", type:"currency",
     cellAttributes:{
        class:{fieldName:"amountColor"},
        iconName:{fieldName:"iconName"},
        iconPosition:"right"

    }},
    {label:"Industry", fieldName:"Industry", type:"text", 
    cellAttributes:{
        class:{fieldName: "industryColor"}
    }},
    {label:"Phone", fieldName:"Phone", type:"Phone"}
    // {label:"Account Name", fieldName:"Name"}
]
export default class DatatableDemo extends LightningElement {

    tabledata;
    columns = COLUMNS;
    @wire(getAccounts)
    accountdata({data, error}){
        if(data){
            console.log("data", data);
            this.tabledata = data.map(item=>{
                let amtcolor =  item.AnnualRevenue < 100000000 ? 'slds-text-color_error' : 'slds-text-color_success slds-text-align_center';
                let iconName =  item.AnnualRevenue < 100000000 ? 'utility:down' : 'utility:up';
                return {...item, 
                    "amountColor": amtcolor, 
                    "iconName":iconName, 
                    "industryColor": "slds-icon-custom-custom6 slds-text-color_default",
                    "AccountColor": "dataTable-green"
                }
            })  
            console.log("after do some manupulation data", this.tabledata);          
        }
        if(error){
            console.error("error", error);
        }
    }

}
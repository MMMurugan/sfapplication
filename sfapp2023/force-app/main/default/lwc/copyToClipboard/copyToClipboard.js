import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/LWCExampleController.getContacts';

// datatable columns
const columns = [
    {
        label: 'Name',
        fieldName: 'ConName',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}
    }, {
        label: 'FirstName',
        fieldName: 'FirstName',
        type: 'text',
    }, {
        label: 'LastName',
        fieldName: 'LastName',
        type: 'text',
    },{
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    },{
        label: 'Email',
        fieldName: 'Email',
        type: 'phone'
    },{
        label: "Action",
        fieldName: "Id",
        type: "button",
        initialWidth: 100,
        typeAttributes: {
          name: 'link',
          label: 'Copy',
          title: 'View History',
          initialWidth: 20,
          class: "icon",
          disabled: false,
          iconPosition: "left",
          target: "_self"
        }
      },

];

export default class CopyToClipboard extends LightningElement {

columns = columns;
@track contactData=[];


@wire(getContacts)
    contacts({error, data}){
        if(data){
            console.log("mmmmmmmm0000", data);
            this.contactData = data;
        }
    }

//  connected callback methord 

// connectedCallback(){
//     getContacts()
//     .then(result =>{
//         this.contactData = result;
//     })
//     .catch(error =>{
//         this.conError=error;
//     });
// }

    copyText(){
        const textarea = this.template.querySelector('textarea');
        this.template.querySelector('c-copy-to-clipboard-util')?.doCopy(textarea.value);
    }


}
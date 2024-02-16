import { LightningElement, wire, track } from 'lwc';
import getContactList1 from '@salesforce/apex/ContactControllernew.getContactList';
import { loadStyle, loadScript  } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/styleSheet';
import myScript from '@salesforce/resourceUrl/myScript';
import images from '@salesforce/resourceUrl/images';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'EmailId', fieldName: 'Email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Address', fieldName: 'Id' }
];

export default class Page1 extends LightningElement {

    icon1 = images + '/images/icon-ai.png';
    renderedCallback() {
       // window.console.log("jfjfgjas");
        Promise.all([   
            loadStyle(this, myResource + '/styleSheet.css'), 
            loadScript(this, myScript + '/jquery.min.js.js'),                
        ])
            // .then(() => {
            //     this.dispatchEvent(
            //         new ShowToastEvent({
            //             title: 'Success',
            //             message: 'your style is Loaded',
            //             variant: 'success',
            //         }),
            //     );  
            // })
            // .catch(error => {
            //     this.dispatchEvent(
            //         new ShowToastEvent({
            //             title: 'Error Loading Third-Party Libraries',
            //             message: error.message,
            //             variant: 'error',
            //         }),
            //     );
            // });
    }

// Data table 

    @track data = [];
    @track columns = columns;
    @wire(getContactList1)
    contacts({ error, data }) {
        this.data = data;
    };

}
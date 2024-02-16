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
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    }
];

export default class ConditionalRenderingTabs extends LightningElement {
    tabOneBool;
    tabTwoBool;

    handleClick1( event ) {

        let buttonClicked = event.target.label;

        switch( buttonClicked ) {
            case "Show Tab 1":
                this.tabOneBool = true;
                break;
            case "Show Tab 2":
                this.tabTwoBool = true;
                break;
            case "Hide Tab 1":
                this.tabOneBool = false;
                break;
            case "Hide Tab 2":
                this.tabTwoBool = false;
                break;            
        }
    }


    consData = [];
    columns = columns;

    @wire(getContacts)
    contacts({ error, data }) {

        if (data) {
            let tempConList = []; 
            
            data.forEach((record) => {
                let tempConRec = Object.assign({}, record);  
                tempConRec.ConName = '/' + tempConRec.Id;
                tempConList.push(tempConRec);
                
            });
            
            this.consData = tempConList;
            this.error = undefined;

            console.table(this.consData);

        } else if (error) {
            this.error = result.error;
        }
    }



    //this is just dummy data
    Announcements = {
        data: [
            {
                Id: 1,
                AnnouncementDescription__c: 'test1'
            },
            {
                Id: 2,
                AnnouncementDescription__c: 'test2'
            },
            {
                Id: 3,
                AnnouncementDescription__c: 'test3'
            }
        ]
    }
    @track clickedButtonLabel = 'Show';

    handleClick(event) {  
        const label = event.target.label;
        //get the id
        const id = event.currentTarget.id  
        //finds the text field
        const annoucement = this.template.querySelector('span[id="' + id + '"]');
        //finds the button
        let button = this.template.querySelector('lightning-button[id="' + id + '"]') 
        //sets the description field to diaplay
        annoucement.style.display = ''
        if ( label === 'Show' ) {  
            //sets the button label to hide
            button.label = 'Hide'

        } else if  ( label === 'Hide' ) {  
            //sets the button label to show
            button.label = 'Show';
            //sets the decription field to hidden   
            annoucement.style.display = 'none'
        }
    }



/*** button style */

    yesSelection(){
        this.template.querySelector('.yesBtn').classList.add('dynamicCSS'); this.template.querySelector('.noBtn').classList.remove('dynamicCSS');
        }
        noSelection(){
        this.template.querySelector('.noBtn').classList.add('dynamicCSS');
        this.template.querySelector('.yesBtn').classList.remove('dynamicCSS');
    }


/********* toggle ********/

show = false;
    handleChange(event){
        this.show = event.target.checked;
    }

}
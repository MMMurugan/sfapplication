import { LightningElement,track, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import jquery from '@salesforce/resourceUrl/jquery';
import myResource from '@salesforce/resourceUrl/styleSheet';
import images from '@salesforce/resourceUrl/icons';

// import adminfile from '@salesforce/resourceUrl/Waliku';

export default class Test extends LightningElement {

    einsteinUrl = images;

    // iconsm = images;
    renderedCallback() {
      //  mmmm;
        // window.console.log("1111111", adminfile + '/js/custom.js')
        Promise.all([
            // loadStyle(this, bootstrap + '/css/bootstrap.css'),
            // loadScript(this, bootstrap + '/js/bootstrap.js'),
            // loadScript(this, popper),
            // loadScript(this, jquery)     
            loadStyle(this, myResource + '/styleSheet.css')
            
        ])
            .then(() => {
           //     mmmm = adminfile + '/index.html';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'your style is Loaded',
                        variant: 'success',
                    }),
                );

            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Loading Third-Party Libraries',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });

    }

    @track
    murugan1 = [
        {'label': 'Ross', 'value': 'option1'},
        {'label': 'Rachel', 'value': 'option2'},
    ];

    murugan = [
        {'label': 'First Name', 'value': 'option3'},
        {'label': 'Last Name', 'value': 'option4'},
    ];

    get checkbox_options() {
        return [
            { label: 'Ross', value: 'option1' },
            { label: 'Rachel', value: 'option2' },
        ];
    }

    // Select option1 by default
    @track
    value = 'option1';

    handleChange(event) {
        const selectedOption = event.detail.value;
        window.console.log(`Option selected with value: ${selectedOption}`);
    }


    // File Upload 


    @api
    myRecordId;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished() {
        // Get the list of uploaded files
      //  const uploadedFiles = event.detail.files;
     //   alert("No. of files uploaded : " + uploadedFiles.length);
    }

}
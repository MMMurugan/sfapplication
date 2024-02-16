import { LightningElement,track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import jquery from '@salesforce/resourceUrl/jquery';
import myResource from '@salesforce/resourceUrl/styleSheet';
import myScript from '@salesforce/resourceUrl/slider'

export default class DesignGuide extends LightningElement {

    @track ageStart = 0;
    @track ageEnd = 0

    minAgeSlider(event){
        this.ageStart = event.target.value;
        this.ageEnd = 0;
   console.log("akdgahk", this.ageStart)
       }
       maxAgeSlider(event){
            this.ageEnd = event.target.value;
            console.log("akdgahk", this.ageEnd)
     }

    renderedCallback() {

        Promise.all([
            // loadStyle(this, bootstrap + '/css/bootstrap.css'),
            
            loadScript(this, myScript + '/jquery-1.11.0.min.js'),
            loadScript(this, myScript + '/jquery.mobile-1.4.5.min.js'),
            loadStyle(this, myScript + '/jquery.mobile-1.4.5.min.css'),
            
            loadStyle(this, myResource + '/style.css'),
            
        ])
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'your style is Loaded',
                        variant: 'success',
                    }),
                );

            })
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


    // Radio Button Code 

    @track defaultRadio = '';
    @track radioHorizontal =''; 

    get options1() {
        console.log("jljhkj")
        return [
            { label: 'Sales', value: 'option1' },
            { label: 'Force', value: 'option2' },
        ];
    }
    get options2() {
        return [
            { label: 'Sales21', value: 'option1' },
            { label: 'Force21', value: 'option2' },
        ];
    }

 // Checkbox Code 

    get checkbox_options() {
        return [
            { label: 'Ross', value: 'option1' },
            { label: 'Rachel', value: 'option2' },
        ];
    }

    get checkbox_options2() {
        return [
            { label: 'Ross', value: 'option1' },
            { label: 'Rachel', value: 'option2' },
        ];
    }

    @track
    Checkbox1 = '';
    Checkbox2 = '';
    handleChange(event) {
        const selectedOption = event.detail.value;
        window.console.log(`Option selected with value: ${selectedOption}`);
    }


   // dropdown code 

   @track optionsvalue = '';

   get options() {
       return [
           { label: 'New', value: 'new' },
           { label: 'In Progress', value: 'inProgress' },
           { label: 'Finished', value: 'finished' },
       ];
   }

   handleChange_dropdown(event) {
       this.optionsvalue = event.detail.value;
   }
   
//    foundation()
//    {

//    }
}
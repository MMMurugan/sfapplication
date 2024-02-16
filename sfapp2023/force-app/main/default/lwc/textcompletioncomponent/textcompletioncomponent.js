import { LightningElement,track,api } from 'lwc';
import textcompletionCeck from '@salesforce/apex/openAIclass.textcompletionCeck';

export default class Textcompletioncomponent extends LightningElement {
    @track textToCheck = '';
    @track responseText;
    @track errorText;

    handleTextChange(event) {
        this.textToCheck = event.target.value;
    }

    getTextCompletion() {
        textcompletionCeck({ texttoCheck: this.textToCheck })
            .then(result => {
                this.responseText = result;
                this.errorText = null;
            })
            .catch(error => {
                this.errorText = error.body.message || 'Unknown error';
                this.responseText = null;
            });
    }
}
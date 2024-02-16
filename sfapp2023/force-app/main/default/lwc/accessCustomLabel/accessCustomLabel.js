import { LightningElement } from 'lwc';
// import WelcomeMessage from '@salesforce/label/c.WelcomeMessage';
// import Disclaimer from '@salesforce/label/c.Disclaimer';
// import Declaration from '@salesforce/label/c.Declaration';
export default class AccessCustomLabel extends LightningElement {
    label ={
        WelcomeMessage,
        Disclaimer,
        Declaration
    };
}
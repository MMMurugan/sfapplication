import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/styleSheet';
import images from "@salesforce/resourceUrl/images";
export default class MakeAppointment extends LightningElement {
    appointment = true;
    visitReason = false;
    provider = false;


    mmlogo = images + '/cookie.png';


renderedCallback() {
    Promise.all([
        loadStyle(this, myResource + '/style.css')            
    ])
  }
  navigatetoHome(){
    this.provider = false
    this.visitReason = false;
    this.appointment = true
  }
  navigatetoVisit(){
    this.appointment = false;    
    this.provider = false
    this.visitReason = true;
  }

  navigatetoProvider(){
    this.appointment = false;
    this.visitReason = false;
    this.provider = true;
  }
}
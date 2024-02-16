import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/styleSheet';
import images from "@salesforce/resourceUrl/images";
export default class DoctorsDashboard extends LightningElement {

    doctorimg = images + "/doctor-thumb-02.jpg";
    patient1 = images + "/patients/patient.jpg";
    patient2 = images + "/patients/patient2.jpg";
    patient3 = images + "/patients/patient3.jpg";
    patient4 = images + "/patients/patient4.jpg";
    videoIcon = images + "/patients/video-icon-sm.svg";
    audioIcon = images + "/patients/audio-icon-sm.svg";
    chatIcon = images + "/patients/chat-sm.svg";
    appointentIcon = images + "/patients/icon-4.png";
  
    // value = ['option1'];

    // get options() {
    //     return [
    //         { label: '10.00 AM', value: 'option1' },
    //         { label: '10.30 AM', value: 'option2' },
    //         { label: '11.00 AM', value: 'option3' },
    //         { label: '11.30 AM', value: 'option4' },
    //         { label: '12.00 AM', value: 'option5' },
    //         { label: '12.30 AM', value: 'option6' },
    //         { label: '1.00 PM', value: 'option7' },
    //         { label: '1.30 PM', value: 'option8' },
    //         { label: '2.00 PM', value: 'option9' },
           
    //     ];
    // }

    // handleChange(e) {
    //     this.value = e.detail.value;
    // }

    isModalOpen = false;
    appointmentModal = false;

    renderedCallback() {
          Promise.all([
              loadStyle(this, myResource + '/style.css')
              
          ])          
    }
    openModal(){
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
        this.appointmentModal = false;
    }
    bookappointmentModal(){
        this.appointmentModal = true;
    }
}
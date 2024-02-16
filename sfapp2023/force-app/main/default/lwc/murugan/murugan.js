import { LightningElement } from 'lwc';

export default class Murugan extends LightningElement {

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
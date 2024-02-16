import { LightningElement, track } from 'lwc';
import defaultTemplate from './screenHeightFlow.html';
import dashboard from './dashboard.html';

const TEMPLATES = {
    "dashboard":dashboard,
  };
  const DELAY = 300;

export default class ScreenHeightFlow extends LightningElement {


    @track page;

    render() {
        const template = TEMPLATES[this.page];
        return template || defaultTemplate;
      }

    navigatetoInnerPage() {
        this.template.querySelector('.dashboard-cards').classList.add('dynamicCSS'); 
        // this.template.querySelector('.sec-mainContent').classList.add('mmm'); 
        this.page = 'dashboard';

        // this.template.querySelector('.sec_main').addClass('mmm'); 
       
    }z

}
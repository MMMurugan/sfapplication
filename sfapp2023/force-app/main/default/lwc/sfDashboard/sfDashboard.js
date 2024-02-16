import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/styleSheet';
// import images from '@salesforce/resourceUrl/images';

export default class SfDashboard extends LightningElement {
    isDashboard = true;
    isLwcRecipes = false;
    isCssRecipes = false;


    // style sheet call methord
    renderedCallback() {
        Promise.all([
            loadStyle(this, myResource + '/custom.css')            
        ])
      }

      navigatetoLwc(){
        this.isDashboard= false;
        this.isLwcRecipes=true;
      }
      navigatetoCss(){
        this.isDashboard= false;
        this.isCssRecipes=true;
      }

      handleHomePage(){
        this.isDashboard = true;
        this.isLwcRecipes=false;
        this.isCssRecipes=false;
      }
    

}
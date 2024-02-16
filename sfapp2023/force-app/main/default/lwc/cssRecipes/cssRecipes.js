import { LightningElement } from 'lwc';

export default class CssRecipes extends LightningElement {

  backtoDashboard(){
        const backtoDashboard = new CustomEvent("backtodashboard", {detail : true});
        this.dispatchEvent(backtoDashboard);
    }
}
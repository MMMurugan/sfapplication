import { LightningElement } from 'lwc';

export default class LwcRecipes extends LightningElement {





backtoDashboard(){
    const backtoDashboard = new CustomEvent("backtodashboard", {detail : true});
    this.dispatchEvent(backtoDashboard);
}

}
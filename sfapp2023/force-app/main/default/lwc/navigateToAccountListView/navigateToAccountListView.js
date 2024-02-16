import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigateToAccountListView extends NavigationMixin(LightningElement) {
    NavigateToAccList(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'list'
            },
            state:{
                filterName:'Recent'
            }
 
        });
    }
}
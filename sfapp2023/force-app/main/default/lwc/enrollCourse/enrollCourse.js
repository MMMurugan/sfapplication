import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class EnrollCourse  extends NavigationMixin(LightningElement){
    
    @api courseDetailInfo={courseName:'Lightning Web Component',courseDuration:'30 Days',courseFee:'10,000', courseRating:'*****'}

    NavigateToCourse(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'https://www.udemy.com/courses/search/?src=ukw&q=debasis+jena'
            }
           
 
        });
    }
}
import { LightningElement, api } from 'lwc';
export default class CourseDetailUpdate extends LightningElement {

    @api courseName='Lightning Web component';
    @api courseFee ='10000';
 
    @api
    updateFee(){
        this.courseFee = parseFloat(this.courseFee) *2;
    }
    changeCourseFee(event){
        this.courseFee = event.target.value;
    }
}
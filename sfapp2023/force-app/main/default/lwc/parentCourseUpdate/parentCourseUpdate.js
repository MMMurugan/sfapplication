import { LightningElement,api } from 'lwc';
export default class ParentCourseUpdate extends LightningElement {
    @api pCourseName='Salesforce Aura Component';
    @api pCourseFee='4900';
    parentUpdateFee(){
        this.template.querySelector('c-course-detail-update').updateFee();
    } 
}
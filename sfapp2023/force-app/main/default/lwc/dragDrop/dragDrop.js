import { LightningElement, track } from 'lwc';

export default class DragDrop extends LightningElement {

    Data = [];
    @track ElementList = ['1st : Apex Salesfore', '2nd : Lightning Web Component', '3rd : Aura Component', '4th : Salesforce Admin', '5th : LoveSalesforceYes']

    connectedCallback(){
        
        if(!this.ElementList){
            this.ElementList = [...this.Data]
        }
    }

    Change(event){
        this.Data = event.detail.join(', ');
    }

     DragStart(event) {
        event.target.classList.add('drag')
    }

    DragOver(event) {
        event.preventDefault()
        return false
    }

    Drop(event) {
        event.stopPropagation()
        const Element = this.template.querySelectorAll('.Items')
        const DragValName = this.template.querySelector('.drag').textContent
        const DropValName = event.target.textContent

        if(DragValName === DropValName){ return false }
        const index = this.ElementList.indexOf(DropValName)
        this.ElementList = this.ElementList.reduce((acc, curVal, CurIndex) => {
            if(CurIndex === index){
                return [...acc, DragValName, curVal]
            }
            else if(curVal !== DragValName){
                return [...acc, curVal]
            }
            return acc
        }, [])

        Element.forEach(element => {
            element.classList.remove('drag')
        })
        return this.ElementList
        }
}
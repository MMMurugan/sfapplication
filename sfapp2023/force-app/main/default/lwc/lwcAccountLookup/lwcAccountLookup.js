import { LightningElement, track } from 'lwc';
import findRecords from '@salesforce/apex/lwcAccountLookupController.findRecords';
export default class LwcAccountLookup extends LightningElement {
    @track records;
    @track error;
    @track selectedRecord;
    @track navigatorIndex = 0;
    @track quantityOptions = [];
    @track recordDetails = {};




    connectedCallback(){


        // if(this.defaultItem.Name!==undefined){
        //     this.selectedRecord = {Name: this.defaultItem.Name, Id: this.defaultItem.Id};
        // }


    }



    handleOnchange(event){


        var recordsList = [];
        const searchKey = event.detail.value;


        this.navigatorIndex = 0;


        findRecords({
            searchKey : searchKey
        })
        .then(result => {



            for(let i=0; i < result.length; i++){
                const rec = result[i];
                recordsList.push({Name: rec.Name, Id: rec.Id, selected: (i===0)?true:false});
            }
            this.error = undefined;



            this.records = recordsList;
        })
        .catch(error => {
            this.error = error;
            this.records = undefined;
        });
    }
    handleSelect(event){


        console.log('event.detail');
        console.log(event.detail);


        const selectedRecordId = event.detail;


        this.selectedRecord = this.records.find( record => record.Id === selectedRecordId);


        this.recordDetails = { recordId : this.selectedRecord.Id, recordName : this.selectedRecord.Name};


        this.dispatchEvent(new CustomEvent(
            "selectedrec",
            {
                detail : this.recordDetails
            }
        ));
        
    }



    handleOnKeyPress(event){
        
        var key     = event.detail;
        var i       = 0;


        if(!this.records){
            return;
        }


        if(key==='ArrowDown'){
            if(this.navigatorIndex<this.records.length-1)
                this.navigatorIndex++;
        }else if(key==='ArrowUp'){
            if(this.navigatorIndex>0)
                this.navigatorIndex--;
        }
        else if(key==='Enter'){
            var temObj = {};
            temObj.detail = this.records[this.navigatorIndex].Id;
            this.handleSelect(temObj);


        }


        for(i=0; i<this.records.length; i++){
            if(i===this.navigatorIndex){
                this.records[i].selected=true;
            }
            else{
                this.records[i].selected=false;
            }
        }


    }


    handleRemove(event){
        event.preventDefault();
        this.selectedRecord = undefined;
        this.records = undefined;
        this.error = undefined;


        const selectedRecordEvent = new CustomEvent(
            "selectedrec",
            {
                detail : { recordId : undefined, recordName : undefined}
            }
        );
        this.dispatchEvent(selectedRecordEvent);
    }
}
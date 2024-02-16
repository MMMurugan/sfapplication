import { LightningElement, track, api, wire } from 'lwc';
    //import uploadFile from '@salesforce/apex/UNILAB_Hat_Upload.handleUpload';
    import {ShowToastEvent} from 'lightning/platformShowToastEvent'
    // import modal from '@salesforce/resourceUrl/Unilab';
    import { loadStyle } from 'lightning/platformResourceLoader';
    // import csvFileUpload from '@salesforce/apex/UNILAB_HAT_Allocation.csvFileUpload';
    // import fetchObjectDetail from '@salesforce/apex/UNILAB_HAT_Allocation.fetchObjectDetail';
    import { NavigationMixin } from 'lightning/navigation';
export default class FileUpload extends LightningElement {




    //@api recordId;

   /** New Code  */
    @api recordId;
    @track errorMessage;
    @track keys;
    @track delimiter;
    @track responseData;
    @track readCSVData;
    @track showSpinner = false;
    @track successCount;
    @track failureCount;
    @track fileName;

    //String Variable Declaration
    selectedObjectName = '';

    //Object Variable Declaration
    uploadObj = {};

    //Boolean Variable Declaration
    showSpinner = false;
    showDownloadButtons = false;
    showFileUpload = false;
    showDownloadUpload = false;
    isFileUploaded = false;

    //Array Variable Declaration
    uploadedFiles = [];
    csvLstArr = [];

    // accepted parameters
    get acceptedCSVFormats() {
        return '.csv';
    }

    //Getter Method for Upload Options
    get uploadOptions() {
        return [
            { label: 'Import', value: 'Import' },
            { label: 'Export', value: 'Export' },
        ];
    }

    //Getter Method for Object Options
    get objectOptions() {
        return [{
            label: 'Customer Master Data',
            value: 'HAT_Account__c'
        }, {
            label: 'Product Allocation',
            value: 'Hat_Allocation__c'
        }, {
            label: 'Storage Location',
            value: 'Storage_Location__c'
        }, {
            label: 'Cut-Off Compliance',
            value: 'Cut_Off_Compliance__c'
        }];
    }

    // @wire(fetchObjectDetail, {
    //     objectName: '$selectedObjectName'
    // })
    // wiredObjectDetails({ error, data }) {
    //     console.log('===data===' + JSON.stringify(data));
    //     console.log('===error===' + JSON.stringify(error));
    //     if (data) {
    //         if (data.length > 0) {
    //             if (this.uploadObj.objectName == 'HAT_Account__c') {
    //                 this.csvLstArr = data.map(row => {
    //                     return {
    //                         Id: row.Id,
    //                         Name: row.Name,
    //                         DistributionChannel: row.Distribution_Channel__c,
    //                         CustomerGroup: row.Customer_group__c,
    //                         CustomerGroupDescription: row.Customer_Group_Description__c,
    //                         SoldToParty: row.Sold_To_Party__c,
    //                         SoldToName: row.Sold_To_Name__c
    //                     }
    //                 });
    //             }
    //             else if (this.uploadObj.objectName == 'Hat_Allocation__c') {
    //                 this.csvLstArr = data.map(row => {
    //                     return {
    //                         Id: row.Id,
    //                         Name: row.Name,
    //                         SalesOrg: row.SalesOrg__c,
    //                         MaterialNumber: row.MaterialNumber__c,
    //                         MaterialDescription: row.MaterialDescription__c,
    //                         AllocationObjectNumber: row.Product_Allocation_Object_Number__c
    //                     }
    //                 });
    //             }
    //             else if (this.uploadObj.objectName == 'Storage_Location__c') {
    //                 this.csvLstArr = data.map(row => {
    //                     return {
    //                         Id: row.Id,
    //                         Name: row.Name,
    //                         PlantCode: row.Plant_Code__c,
    //                         StorageLocationCode: row.Storage_Location_Code__c
    //                     }
    //                 });
    //             }
    //             else if (this.uploadObj.objectName == 'Cut_Off_Compliance__c') {
    //                 this.csvLstArr = data.map(row => {
    //                     return {
    //                         Id: row.Id,
    //                         Name: row.Name,
    //                         AccountGroupName: row.Account_Group_Name__c,
    //                         BranchName: row.Branch_Name__c,
    //                         SODate: row.SO_Date__c,
    //                         DeliveryDate: row.Delivery_Date__c,
    //                     }
    //                 });
    //             }
    //             console.log('===ddd===' + JSON.stringify(this.csvLstArr));
    //         }
    //     }
    // }

    //Handle On Change method
    handleOnChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        console.log('==event.target.value==' + event.target.value);

        switch(name) {
            case 'type':
                this.uploadObj.type = event.target.value;
                this.showFileUpload = value === 'Import' ? true : false;
                this.showDownloadUpload = value === 'Export' ? true : false;;
                break;
            case 'objectName':
                this.uploadObj.objectName = event.target.value;
                this.selectedObjectName = event.target.value;
                break;
        }
    }

    handleUploadFinished(event) {
        if (!this.uploadObj.objectName)
            return this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Warning',
                    message: 'Object Name Selection is mandatory',
                    variant: 'warning'
                })
            );
        
        this.showSpinner = true;

        // Get the list of uploaded files
        this.uploadedFiles = event.detail.files;
        this.fileName = event.detail.files[0].name;
        this.isFileUploaded = this.fileName ? true : false;

        let file = event.detail.files;
        console.log('==fiel===' + file);

        if (!file) {
            return this.dispatchEvent(new ShowToastEvent({
                title: 'warning',
                message: 'No File has selected',
                variant: 'warning'
            }));
        } else {
            this.showSpinner = false;
        }
    }

    uploadFileHandler() {
        if (!this.uploadedFiles)
            return this.dispatchEvent(
                new ShowToastEvent({
                    title: "Warning",
                    message: "CSV File has not added",
                    variant: "warning"
                })
            );
        this.showSpinner = true;
        // Get the list of records from the uploaded files

        // calling apex class csvFileread method
        csvFileUpload({
            contentDocumentId: this.uploadedFiles[0].documentId,
            objectName: this.uploadObj.objectName
        })
        .then(result => {
            console.log('===resul===' + JSON.stringify(result));
            this.data = result;
            this.showSpinner = false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: 'HAT Account records are created successfully',
                    variant: 'Success'
                }),
            );
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: this.uploadObj.objectName,
                    actionName: 'list'
                },
                state: {
                    filterName: 'All' 
                }
            });
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error'
                }),
            );     
        })
    }

    readerLoad(event) {
        let csv = event.target.result;
        let result = this.handleCsvsvToJson(csv);
    
        //method to create leads from the json
        if(result != undefined){
        
            this.readCSVData = result;
            this.showSpinner = false;
            //this.handleUpload(result)
        
                    // this.readCsvApex(result);
            
        }      
    }

    handleCsvsvToJson(csv) {
        this.errorMessage = '';
        this.keys = ['CustomerName','MaterialCode','Amount' ,'PPD'];
        var keysCSV = this.keys;
        //['LegalEntityName','MarketingName','FirstName','LastName','Tier','Email','PhoneNumberOne',
        // 'PhoneNumberTwo', 'StreetNameNumber', 'City', 'Zip', 'Country'];
        var arr = []; 
        let re;
        arr =  csv.split('\n');
        var jsonObj = [];
        var delimitter = ',';
        if(arr[0].includes(';')){
            delimitter = ';';
        }
        this.delimiter = delimitter;
        var headers = arr[0].split(delimitter);
        var count = 0;
        var headingCount = 0;
        for (var i = 0; i < headers.length; i++) {
            headers[i] = headers[i].trim()
            if(headers[i] != ''){
                headingCount++;
            }
        }
        for (i = 0; i < keysCSV.length; i++) {
            if(headers.includes(keysCSV[i])){
                count++;
            }
        }

        if(count != keysCSV.length){
            this.errorMessage = 'Incorrect format. Please check the file.';
            return;
        }

        
            for(var i = 1; i < arr.length  ; i++) {
                var test = arr[i];

                //Handle if first column of the csv is blank
                if(test.indexOf(delimitter) == 0){
                    test = ' '+ test;
                }

                //Handle if last column of the csv is blank
                if(test.lastIndexOf(delimitter) == test.length-2 ){
                    test =  test + ' ';
                }

                if(delimitter == ','){

                    while(test.includes(',,')){
                        test = test.replaceAll(',,',', ,');
                    }
                }

                else if(delimitter == ';'){
                
                    while(test.includes(';;')){
                        test = test.replaceAll(';;','; ;');
                    }
                }

                var regularExpression; 
                if(delimitter == ','){
                    re = new RegExp('(".*?"|[^",]+)(?=,|$)','g');
                } else {
                    re = new RegExp('(".*?"|[^";]+)(?=;|$)','g');
                }
                
                var data = test.match(re);
                if(data != null){
                    if(data.length > headingCount){
                        this.errorMessage = 'Incorrect format. Please check the file.';
                        return; 
                    }
                
                    var obj = {};
                    for(var j = 0; j < data.length; j++) {
                        var dataCSV = data[j].trim();
                    
                        if(delimitter == ',' && dataCSV.includes(',')){
                            dataCSV = dataCSV;
                        
                        } else if(delimitter == ';' && dataCSV.includes(';')){
                            dataCSV = dataCSV.substring(1,dataCSV.length - 2);
                        }
                        obj[headers[j].trim()] = dataCSV;
                    }
                    jsonObj.push(obj);
                }
            }
        
        
        var json = JSON.stringify(jsonObj);
        return json;
    }

    handleUpload(){
        console.log(this.recordId);
        this.showSpinner = true
        uploadFile({csvStr: this.readCSVData,recordId : this.recordId})
        .then(result => {
            this.showDownloadButtons = true;
            this.responseData = result; 
            this.showSpinner = false;
            this.successCount =  this.getSuccessDataCount();
            this.failureCount = this.getFailedDataCount();
        })
        .catch(error => {
            this.error = error;
        
        })
    }

    getFailedDataCount(){
        var failedData = this.responseData.filter(function (el) {
            return el.Status != 'Success' ;
            });
        return failedData.length;
    }

    getSuccessDataCount(){
        var successData = this.responseData.filter(function (el) {
            return el.Status == 'Success' ;
            });
        return successData.length;
    }


    getFailedData(){
        var failedData = this.responseData.filter(function (el) {
                        return el.Status != 'Success' ;
                        });
        this.downloadCSVFile(failedData,'Error');
        
    }

    getSuccessData(){
        var successData = this.responseData.filter(function (el) {
            return el.Status == 'Success' ;
            });
        this.downloadCSVFile(successData,'Success');
    }


    // this method validates the data and creates the csv file to download
    downloadCSVFile(downloadData,fileName) {   
        let rowEnd = '\n';
        let csvString = '';
        // this set elminates the duplicates if have any duplicate keys
        let rowData = new Set();

        // getting keys from data
        rowData =  ['CustomerName','MaterialCode','Amount','PPD','Status'];

        // Array.from() method returns an Array object from any object with a length property or an iterable object.
        rowData = Array.from(rowData);
        
        // splitting using ','
        csvString += rowData.join(',');
        csvString += rowEnd;

        // main for loop to get the data based on key value
        for(let i=0; i < downloadData.length; i++){
            let colValue = 0;

            // validating keys in data
            for(let key in rowData) {
                if(rowData.hasOwnProperty(key)) {
                    // Key value 
                    // Ex: Id, Name
                    let rowKey = rowData[key];
                    // add , after every value except the first.
                    if(colValue > 0){
                        csvString += ',';
                    }
                    // If the column is undefined, it as blank in the CSV file.
                    let value = downloadData[i][rowKey] === undefined ? '' : downloadData[i][rowKey];
                    csvString += '"'+ value +'"';
                    colValue++;
                }
            }
            csvString += rowEnd;
        }

        // Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = fileName+'.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click(); 
    }

    exportToCSV() {
        console.log('==22==' + this.selectedObjectName);
        if (!this.uploadObj.objectName)
            return this.dispatchEvent(new ShowToastEvent({
                title: 'warning',
                message: 'Object Name selection is mandatory',
                variant: 'warning'
            }));

        this.showSpinner = true;
        var columnHeader = [];
        var jsonKeys = [];
        var fileName = '';

        this.objectOptions.forEach(row => {
            if (row.value == this.selectedObjectName) {
                fileName = row.label;
            }
        });

        if (this.selectedObjectName == 'HAT_Account__c') {
            columnHeader = ["ID", "DISTRIBUTION CHANNEL", "CUSTOMER GROUP", "CUSTOMER GROUP DESCRIPTON", "SOLD TO PARTY", "SOLD TO NAME"];
            jsonKeys = ["Name", "DistributionChannel", "CustomerGroup", "CustomerGroupDescription", "SoldToParty", "SoldToName"];
        } else if (this.selectedObjectName == 'Hat_Allocation__c') {
            columnHeader = ["ID", "SALES ORG", "MATERIAL NUMBER", "MATERIAL DESCRIPTION", "PRODUCT ALLOCATION OBJECT NUMBER"];
            jsonKeys = ["Name", "SalesOrg", "MaterialNumber", "MaterialDescription", "AllocationObjectNumber"];
        } else if (this.uploadObj.objectName == 'Storage_Location__c') {
            columnHeader = ["ID", "PLANT CODE", "STORAGE LOCATION CODE"];
            jsonKeys = ["Name", "PlantCode", "StorageLocationCode"];
        } else if (this.uploadObj.objectName == 'Cut_Off_Compliance__c') {
            columnHeader = ["ID", "ACCOUNT GROUP NAME", "BRANCH NAME", "SO DATE", "DELIVERY DATE"];
            jsonKeys = ["Name", "AccountGroupName", "BranchName", "SODate", "DeliveryDate"];
        }
        console.log('==this.csvLstArr==' + JSON.stringify(this.csvLstArr));
        // This array holds the keys in the json data
        var jsonRecordsData = this.csvLstArr;
        let csvIterativeData;
        let csvSeperator;
        let newLineCharacter;
        csvSeperator = ",";
        newLineCharacter = "\n";
        csvIterativeData = "";
        csvIterativeData += columnHeader.join(csvSeperator);
        csvIterativeData += newLineCharacter;

        for (let i = 0; i < jsonRecordsData.length; i++) {
            let counter = 0;
            for (let iteratorObj in jsonKeys) {
                let dataKey = jsonKeys[iteratorObj];
                if (counter > 0) {
                    csvIterativeData += csvSeperator;
                }
                if (jsonRecordsData[i][dataKey] !== null && jsonRecordsData[i][dataKey] !== undefined) {
                    csvIterativeData += '"' + jsonRecordsData[i][dataKey] + '"';
                } else {
                    csvIterativeData += '""';
                }
                counter++;
            }
            csvIterativeData += newLineCharacter;
        }
        console.log('==csvIterativeData==' + csvIterativeData)
        this.hrefdata = "data:text/csv;charset=utf-8," + encodeURI(csvIterativeData);
        let downloadElement = document.createElement('a');
        downloadElement.href = this.hrefdata;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = fileName + '.xls';
        document.body.appendChild(downloadElement);
        this.showSpinner = false;
        downloadElement.click();
    }
}
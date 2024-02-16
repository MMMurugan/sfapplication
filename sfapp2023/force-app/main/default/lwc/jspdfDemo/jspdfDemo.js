import {LightningElement} from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jspdf';
// import getContacts from '@salesforce/apex/PdfGenerator.getContactsController';


const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Industry', fieldName: 'Industry' }
];  
const columns2 = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Industry', fieldName: 'Industry' }
];  

export default class JspdfDemo extends LightningElement {
    contactList = [];
    headers = this.createHeaders([
        "label",
        "fieldName"
    ]);
    data ;


    renderedCallback() {
        Promise.all([
            loadScript(this, JSPDF)
        ]);
    }

    generatePdf(){
        const { jsPDF } = window.jspdf;
       // var source = window.document.getElementsById("pdf")[0];
        const doc = new jsPDF({
            // encryption: {
            //     userPassword: "user",
            //     ownerPassword: "owner",
            //     userPermissions: ["print", "modify", "copy", "annot-forms"]
            //     // try changing the user permissions granted
            // }
        });
        
        doc.setFontSize(20);
        doc.text("This is test pdf", 20, 20);
        doc.setFontSize(28);
        doc.setTextColor("#00ff00");
        doc.text("Murugan", 20, 40);
        doc.setTextColor(255,0,0);
        doc.text(20, 50, 'This is red.');
        doc.setTextColor(0,0,0);
        doc.table(20, 60, columns, this.headers, { autosize:true });

        doc.table(20, 130, columns2, this.headers, { autosize:true });

        //doc.fromHTML($('#pdf').get(0), 10, 10, {'width': 600});
      //  printDoc.fromHTML($('#pdf').get(0), 10, 10, {'width': 180});
      //doc.addHTML($('#pdf')[0], 15, 15);

      let elementHTML = $('#pdf').html();
      doc.fromHTML(elementHTML, 15, 15, {'width': 170, });

      doc.save("demo.pdf");
    }

    generateData(){
        // getContacts().then(result=>{
        //     this.contactList = result;
        //     this.generatePdf();
        // });
        this.generatePdf();
    }

    createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 65,
                align: "center",
                padding: 0
            });
        }
        return result;
    }


  


    generatePdf2(){
        console.log("000000000");
        const { jsPDF } = window.jspdf;
        var docs = new jsPDF();
        // var elementHTML = $('#pdf').html();
        // console.log("1111111111");
        // docs.fromHTML(elementHTML, 15, 15, {
        //     'width': 170,
            
        // });

        docs.addHTML($('#pdf').html(), 15, 15, {
            'width': 500,
             });
        
        // Save the PDF
        console.log("000000000");
        docs.save('sample-document.pdf');


// console.log("pdfffffff");
// const { jsPDF } = window.jspdf;
//         let docs = new jsPDF();       
//         docs.addHTML($('#pdf').html(), 15, 15, {
//             'width': 500,
//         });

//         docs.save('sample-file.pdf');
        
    }


    generateDataPdf(){
        console.log("pdfffffff11111");
        this.generatePdf2();
        console.log("pdfffffff2222");
    }


    }
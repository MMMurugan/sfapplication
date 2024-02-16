import { LightningElement } from 'lwc';

import { loadStyle, loadScript  } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/styleSheet';
import myScript from '@salesforce/resourceUrl/myScript';
import images from '@salesforce/resourceUrl/images';

export default class NavMenuGoogle extends LightningElement {



    renderedCallback() {
         window.console.log("load styles");
         Promise.all([   
            //  loadStyle(this, myResource + '/styleSheet.css'), 
             loadScript(this, myScript + '/jquery.min.js'),                
             loadScript(this, myScript + '/script.js'),                
         ])

     }

     

}
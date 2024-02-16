import { LightningElement } from 'lwc';

export default class MmmAllTabs extends LightningElement {

    addclass=false;
    getclassvalue(event){
        this.addclass = event.detail.searchKey;
        console.log("u31iuc31ui3ty", this.addclass);
    }
    
    
    get mainClass() { 
        return this.addclass ? 'admin' : '';
      }




      /////*************************************************** */


      jsonObject = {
        "CBD20J-Li": [
            {
                "Id": "a1h78000002KquYAAS",
                "AcctSeedERP_Available_Quantity_c": 50,
                "AcctSeedERP_Sales_Order_Quantity_c": 0,
                "AcctSeedERP_Warehouse_c": "a1v8c0000051YmXAAU",
                "AcctSeedERP_Product_c": "01t8c00000P7xxKAAR",
                "AcctSeedERP_Location_c": "a1i8c00000KVij0AAD",
                "AcctSeedERP_Product_r": {
                    "Name": "CBD20J-Li",
                    "Id": "01t8c00000P7xxKAAR"
                },
                "AcctSeedERP_Location_r": {
                    "Name": "Location-1",
                    "Id": "a1i8c00000KVij0AAD"
                },
                "AcctSeedERP_Warehouse_r": {
                    "Name": "Warehouse 1",
                    "Id": "a1v8c0000051YmXAAU"
                }
            }
        ],
        "Part 1": [
            {
                "Id": "a1h8c00000He2VqAAJ",
                "AcctSeedERP_Available_Quantity_c": 5,
                "AcctSeedERP_Sales_Order_Quantity_c": 5,
                "AcctSeedERP_Warehouse_c": "a1v8c0000051YmXAAU",
                "AcctSeedERP_Product_c": "01t8c00000QgL0tAAF",
                "AcctSeedERP_Location_c": "a1i8c00000KVij0AAD",
                "AcctSeedERP_Product_r": {
                    "Name": "Part 1",
                    "Id": "01t8c00000QgL0tAAF"
                },
                "AcctSeedERP_Location_r": {
                    "Name": "Location-1",
                    "Id": "a1i8c00000KVij0AAD"
                },
                "AcctSeedERP_Warehouse_r": {
                    "Name": "Warehouse 1",
                    "Id": "a1v8c0000051YmXAAU"
                }
            },
            {
                "Id": "a1h78000002KquOAAS",
                "AcctSeedERP_Available_Quantity_c": 50,
                "AcctSeedERP_Sales_Order_Quantity_c": 0,
                "AcctSeedERP_Warehouse_c": "a1v8c0000051YmXAAU",
                "AcctSeedERP_Product_c": "01t8c00000QgL0tAAF",
                "AcctSeedERP_Location_c": "a1i8c00000KVij5AAD",
                "AcctSeedERP_Product_r": {
                    "Name": "Part 1",
                    "Id": "01t8c00000QgL0tAAF"
                },
                "AcctSeedERP_Location_r": {
                    "Name": "Location 2",
                    "Id": "a1i8c00000KVij5AAD"
                },
                "AcctSeedERP_Warehouse_r": {
                    "Name": "Warehouse 1",
                    "Id": "a1v8c0000051YmXAAU"
                }
            }
        ]
    };

   // Prepare the data for rendering
    get data() {
        const result = [];
        for (const key in this.jsonObject) {
            this.jsonObject[key].forEach((item) => {
                console.log("111111111", item);
                result.push({ key, value: item, class : 'mmmm'});
            });
            console.log("mmmmmm");
        }
        return result;
    }

      /////*************************************************** */
}
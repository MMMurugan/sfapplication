public with sharing class ContactManager {

    // basic --- all contact list 

    // @AuraEnabled(cacheable=true)
    // public static list<Contact> fetchAllContacts(){
    //     List<Contact> conlist = [SELECT Id, NAME, Phone, Email, Account.Name FROM Contact ];
    //     return conList;
        
    // }


    // condition based showing list
   
        @AuraEnabled(cacheable=true)
        public static list<Contact> fetchAllContacts( string accountId){
            if(string.isNotBlank(accountId)){
            List<Contact> conlist = [SELECT Id,NAME,Phone,Email,Account.Name FROM Contact WHERE AccountId =:accountId];
            return conList;
            }
            else{
                return NULL;
            }
        }
        @AuraEnabled(cacheable=true)
        public static list<Account> getAllAccount(){
            return [SELECT Id,Name from ACCOUNT];    
        } 

}
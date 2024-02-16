public with sharing class MassDeleteContacts {
 
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        try {
            return[
                SELECT Id, firstName, lastName, Title, Phone, Email FROM Contact Where firstName != null order by createdDate desc];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Void deleteContacts(list<Id> selcontactList){

        List<Contact> contactList = new List<Contact>();
        contactList = [SELECT id from Contact where id in:selcontactList]; 
        if(contactList != null && contactList.size() >0){
            delete contactList;
        }
    }

}
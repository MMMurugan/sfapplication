public with sharing class CorporateInformation {
    @AuraEnabled
    public static list<Account> fetchAllAccounts(){
        list<Account> accList = [SELECT Id, IsDeleted, Name, Phone, AccountNumber, Website, Description, Rating, Type FROM Account];
        return accList;
    }
}
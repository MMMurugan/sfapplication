public with sharing class AccountController {

@AuraEnabled(cacheable=true)
public static List<Account> displayAccounts(){
    return [select Id, Name, Phone, Site from Account];
}

@AuraEnabled
public static List<Account> updateRecords(string accId){
    Account acc = [select Id, Name, Phone, Site from Account where Id=:accId]; 
    acc.site = 'record updated by Muru';
    try {
       update acc;
        
    } catch (Exception e) {
       // throw new AuraHandledException(e.getMessage());
    }
    return displayAccounts();
}

}
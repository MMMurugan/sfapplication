public with sharing class tableController {
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccounts(){
    try {
        return [SELECT Id, Name, AnnualRevenue, Industry, Phone from Account];        
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}
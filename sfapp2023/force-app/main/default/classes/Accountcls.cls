public with sharing class Accountcls {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        // return [SELECT Id, Name, Type, Industry, AnnualRevenue FROM Account Where Industry != null and  AnnualRevenue != null];       
        return [SELECT Id, Name, Type, Industry, AnnualRevenue FROM Account];       
    }
}
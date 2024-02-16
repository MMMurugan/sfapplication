public with sharing class LearnAccountDetails {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccountDetails(String accountData){
      List<Account> accountlist = [SELECT Id, IsDeleted, Name, Phone, AccountNumber, Website, Description, Rating, Type from Account Where Id = :accountData];
      return accountlist;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccountDataList(){
      List<Account> accountDataList = [SELECT id, Name, AnnualRevenue, Phone from Account];
      return accountDataList;
    }
    
}
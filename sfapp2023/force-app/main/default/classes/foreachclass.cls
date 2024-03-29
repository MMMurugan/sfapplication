public with sharing class foreachclass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name  FROM Account];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getInnerData() {
      return [SELECT Id, Name, (SELECT Id, Name FROM Contacts) FROM Account];
   }
}
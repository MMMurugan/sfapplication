public with sharing class AccountSearch {

    @AuraEnabled(cacheable=true)
    public static List<account> getAccounts(String actName ){
        String keyString = '%'+actName+'%';
        return [SELECT id, name from Account where name like:keyString];
    }
}
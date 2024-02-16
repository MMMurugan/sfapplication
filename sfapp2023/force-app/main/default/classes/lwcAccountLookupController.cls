public with sharing class lwcAccountLookupController {
    @AuraEnabled(cacheable=true)
        public static List<Account> findRecords(String searchKey){
            String key = '%' + searchKey + '%';
            String QUERY = 'Select Id, Name From Account Where Name LIKE :key Limit 10';
            return Database.query(QUERY);
        }
    
    }
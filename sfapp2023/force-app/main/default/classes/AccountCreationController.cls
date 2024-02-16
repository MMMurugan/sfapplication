public with sharing class AccountCreationController {

    @AuraEnabled
    public static Account createAccounts(Account accountRecObj){
        try{
            insert accountRecObj;
            return accountRecObj;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
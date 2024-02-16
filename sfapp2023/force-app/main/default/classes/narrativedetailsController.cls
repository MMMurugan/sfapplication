public with sharing class narrativedetailsController {
    
    @AuraEnabled
    public static void saveCaseRecord(Case objcase){
        try{
            insert objcase;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
    }
public with sharing class applicationContactDetailsAddOrEdit {
    @AuraEnabled(cacheable = true)
    // public static List<SObject> getAllContactDetails () {
    //     String model = 'ContactNotes__c';
    //     String fields = 'ContactType__c, Purpose__c, Location__c, Date__c, Time__c, ContactName__c, ContactRole__c, Phone__c, Email__c, Narrative__c';
    //     String cond = 'Application__c = \''+ applicationId +'\''+' ORDER BY Id DESC';
    //     String cond = '';
    //     return DMLOperationsHandler.selectSOQLWithConditionParameters (model, fields, cond);
    // }

    public static List<SObject> getAllContactDetails () {
        // String model = 'ContactNotes__c';
        // String fields = 'Id, ContactType__c, Purpose__c, Location__c, Date__c, Time__c, ContactName__c, ContactRole__c, Phone__c, Email__c, Narrative__c';
        // String cond = '';
        // return DMLOperationsHandler.selectSOQLWithConditionParameters (model, fields, cond);

        return [SELECT Id, ContactType__c, Purpose__c, Location__c, Date__c, Time__c, ContactName__c, ContactRole__c, Phone__c, Email__c, Narrative__c FROM ContactNotes__c];
    }

    @AuraEnabled
    public static List<SObject> editContactDetails (String selectedContactId) {
        String model = 'ContactNotes__c';
        String fields = 'Id, ContactType__c, Purpose__c, Location__c, Date__c, Time__c, ContactName__c, ContactRole__c, Phone__c, Email__c, Narrative__c';
        String cond = 'Id = \''+ selectedContactId +'\'';

        return DMLOperationsHandler.selectSOQLWithConditionParameters (model, fields, cond);
    }
}
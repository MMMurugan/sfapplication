public with sharing class DuplicateRecordRetriever {
    public class MyObjectWrapper {
        @AuraEnabled 
        public String FromEmail { get; set; }
        @AuraEnabled 
        public String ToEmail { get; set; }
    }

    @AuraEnabled
    public static List<MyObjectWrapper> getUniqueRecords() {
        List<MyObjectWrapper> uniqueRecords = new List<MyObjectWrapper>();

        // Use GROUP BY and aggregate functions to get unique records based on FromEmail__c and ToEmail__c
        List<AggregateResult> aggregateResults = [
            SELECT FromEmail__c, ToEmail__c
            FROM EmailSender__c
            GROUP BY FromEmail__c, ToEmail__c
        ];

        // Map the queried records to the MyObjectWrapper class
        for (AggregateResult aggResult : aggregateResults) {
            MyObjectWrapper wrapper = new MyObjectWrapper();
            wrapper.FromEmail = (String) aggResult.get('FromEmail__c');
            wrapper.ToEmail = (String) aggResult.get('ToEmail__c');
            uniqueRecords.add(wrapper);
        }

        return uniqueRecords;
    }
}
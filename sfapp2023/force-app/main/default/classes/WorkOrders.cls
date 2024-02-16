public with sharing class WorkOrders {

    @AuraEnabled(cacheable=true)
    public static List<WorkOrderItem__c> getWorkOrdersValues() {       
            List<WorkOrderItem__c> workOrders= [SELECT Id, Name, WorkOrderName__c, WorkOrderDate__c, AssignedUser__c,AssignedUser__r.Name, TotalQuantity__c, TotalItemsAdded__c, Status__c, Description__c, Account__c, Account__r.Name FROM WorkOrderItem__c ];
            return workOrders;       
    }
   
}
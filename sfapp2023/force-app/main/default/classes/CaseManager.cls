public with sharing class CaseManager {

   // @AuraEnabled
   // public static list<Case> fetchCaseDetails(){
   //  // List<Case> caselist = [SELECT Id, Account.Name, CaseNumber, IsClosed, Origin, Description, Priority, Subject, Status FROM Case];
   //  List<Case> caselist = [SELECT Id, CaseNumber, ContactId, Type, Status, Reason, Subject, Priority FROM Case];
   //  return caselist;
   // }

   @AuraEnabled
   public static list<Case> fetchCaseDetails(String caseNumber){
      if(String.isNotBlank(caseNumber)){
         String searchCase = '%'+caseNumber+'%';
         List<Case> caseDetails = [SELECT Id, Account.Name, CaseNumber, IsClosed, Origin, Description, Subject, Status FROM Case WHERE caseNumber LIKE :searchCase];
         return caseDetails;
      }
      else{
      return NULL;
      }
   }


   @AuraEnabled
   public static string closeCase(string caseId){
      string message;
      try {
         case cs = new case(Id=caseId);
         cs.Status = 'Closed';
         update cs;
         message = 'Success';
      } catch (Exception e) {
         message = e.getMessage();
      }
      return message;
   }
}
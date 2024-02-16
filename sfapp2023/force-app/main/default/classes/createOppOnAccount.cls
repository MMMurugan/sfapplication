public class createOppOnAccount {
    public static void createOppOnAccount(){
        List<Account> accList = [SELECT Id, Name FROM Account WHERE CreatedDate = THIS_YEAR];
        List<Opportunity> oppToBeCreated = new List<Opportunity>();
        
        if(accList.size() > 0){
            for(Account acc : accList){
                Opportunity opp = new Opportunity();
                opp.Name = acc.Name;
                opp.CloseDate = System.today();
                opp.StageName = 'Prospecting';
                opp.AccountId = acc.Id;
                oppToBeCreated.add(opp);
            }
        }
        if(oppToBeCreated.size() > 0 ){
            insert oppToBeCreated;
        }
    }

}
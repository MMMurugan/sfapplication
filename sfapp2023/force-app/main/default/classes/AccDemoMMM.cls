public class AccDemoMMM {
    public static void getAccList(){
      //  List<Account> accList = new List<Account>();
        Set<Id> accIds = new Set<Id>();
        List<Account> accList = [SELECT Id, Name FROM Account Limit 5];
        Map<Id,Account> idToAccMap = new Map<Id,Account>(accList);
        
        System.debug('acclist' + accList);
        for(Account acc : accList){
            accIds.add(acc.id);           
        }
         System.debug('accIds' + accIds);
        
        if(!accIds.isEmpty()){
            // for(Id i : accIds){ 
            for(Id i : idToAccMap.keySet()){
                if(idToAccMap.containsKey(i)){
                    System.debug('map values'+ idToAccMap.get(i));
                }
                System.debug('Ids'+ i);
            }
        }
    }
}
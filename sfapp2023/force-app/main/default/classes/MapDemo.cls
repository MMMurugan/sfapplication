public class MapDemo {
    public static void mapDemoMethod(){
        Map<Integer, String> intToString = new Map<Integer, String>();
        List<Account> accList = [SELECT Id, Type, ParentId, Phone, Website, AccountNumber, Rating, Description FROM Account];
        System.debug('acclist' + accList);
    }
}
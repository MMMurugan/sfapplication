public with sharing class DataRetrievalClass{
    public static List<Contact> getContactData() {
        // Replace this with your own logic to retrieve the data from the database
        List<Contact> conlist = [SELECT Id, Name, Email, Phone FROM Contact LIMIT 10];
        return conlist;
    }
}
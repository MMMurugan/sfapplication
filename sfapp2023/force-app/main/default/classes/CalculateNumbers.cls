public with sharing class CalculateNumbers {

    @AuraEnabled
    public static integer getSumResult(integer fNumber, integer sNumber){
        return (fNumber + sNumber);
    }
}
/**
 * @Author        : V.S.Marimuthu
 * @CreatedOn     : Feb 26 ,2020
 * @Purpose       : All the dynamic DML operations have to done through this class
 **/
public with sharing class DMLOperationsHandler{
	public DMLOperationsHandler(){
	}

	@AuraEnabled(cacheable = true)
	public static List<sObject> selectSOQL(string SobjectApiName, string strSelectFields){
		//This Method will return all the columns from an object
		List<sObject> sObjectList = new List<sObject>();
		try{
			sObjectList = Database.query(getSelectQuery(SobjectApiName, strSelectFields, null, null));
		} catch (Exception Ex){
		}
		return sObjectList; //May be I will return list of sObject values
	}

	@AuraEnabled
	public static List<sObject> selectSOQLWithLimit(string SobjectApiName, string strSelectFields, integer intLimit){
		// This Method will return all the columns from an object with limit
		List<sObject> sObjectList = new List<sObject>();
		try{
			sObjectList = Database.query(getSelectQuery(SobjectApiName, strSelectFields, intLimit, null));
		} catch (Exception Ex){
		}
		return sObjectList; //May be I will return list of sObject values
	}

	@AuraEnabled(cacheable = true)
	public static List<sObject> selectSOQLWithConditionParameters(string SobjectApiName, string strSelectFields, String strWhereFeildNames){
		// This Method will return all the columns from an object if where parameters are supplied
		// Where parameters have to be supplied thorugh map eg; Map<Name ,'Genepoint'>
		strWhereFeildNames = ' WHERE ' + strWhereFeildNames;
		List<sObject> sObjectList = new List<sObject>();
		try{
			sObjectList = Database.query(getSelectQuery(SobjectApiName, strSelectFields, null, strWhereFeildNames));
		} catch (Exception Ex){
		}
		System.debug('Result from Query ------' + sObjectList);
		return sObjectList; //May be I will return list of sObject values
	}

	@AuraEnabled
	public static string updateOrInsertSOQL(sObject objSobjecttoUpdateOrInsert){
		//This method is exposed to front end and reponsile for upsert operation
		//sObject is passed to updateOrInsertQuery where real data base insert or update will happen
		return DMLupdateOrInsertQuery(objSobjecttoUpdateOrInsert);
	}

	@AuraEnabled
	public static void updateOrInsertSOQLForList(List<sObject> objSobjecttoUpdateOrInsert){
		//This method is exposed to front end and reponsile for upsert operation
		//sObject is passed to updateOrInsertQuery where real data base insert or update will happen
		DMLupdateOrInsertQueryForList(objSobjecttoUpdateOrInsert);
	}

	@AuraEnabled
	public static string updateOrInsertSOQLReturnId(sObject objSobjecttoUpdateOrInsert){
		//This method is exposed to front end and reponsile for upsert operation
		//sObject is passed to updateOrInsertQuery where real data base insert or update will happen
		return DMLupdateOrInsertQueryReturnID(objSobjecttoUpdateOrInsert);
	}

	@AuraEnabled
	public static Id getIdAfterInsertSOQL(sObject objIdSobjecttoUpdateOrInsert){
		//This method is exposed to front end and reponsile for upsert operation
		//sObject is passed to updateOrInsertQuery where real data base insert or update will happen
		insert objIdSobjecttoUpdateOrInsert;
		return objIdSobjecttoUpdateOrInsert.Id;
	}
	@AuraEnabled(cacheable = true)
	public static string deleteRecordById(Id id){
		string strResult='';
		try{
			Database.DeleteResult deleteResults= Database.Delete(id.getSobjectType().newSObject(id));
			if (deleteResults.isSuccess()){
				strResult = ProviderConstants.DELETESUCCESS ;
			} else{
				strResult = ProviderConstants.ERROR;
			}
		}
		catch(Exception Ex)
		{

		}
		return strResult;
	}
	@AuraEnabled(cacheable = true)
	public static List<FetchValueWrapper> fetchPickListValue(sObject objInfo, string picklistFieldApi){
		// Describe the SObject using its object type.
		Schema.DescribeSObjectResult objDescribe = objInfo.getSObjectType().getDescribe();
		// Get a map of fields for the SObject
		Map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
		// Get the list of picklist values for this field.
		List<Schema.PicklistEntry> values = fieldMap.get(picklistFieldApi).getDescribe().getPickListValues();
		// Create a list of wrapper to store picklist value/lable
		List<FetchValueWrapper> objWrapper = new List<FetchValueWrapper>();
		for (Schema.PicklistEntry a : values){
			FetchValueWrapper oFetchValueWrapper = new FetchValueWrapper();
			oFetchValueWrapper.label = a.getLabel();
			oFetchValueWrapper.value = a.getValue();
			objWrapper.add(oFetchValueWrapper);
		}
		return objWrapper; // May be i will return data
	}

	public static string DMLupdateOrInsertQueryReturnID(SObject sObjectsToUpdate){
		string strResult;
		// This method is responsible for updating the objects
		Database.UpsertResult Upsertresults = Database.upsert(sObjectsToUpdate);
		System.debug('Upsertresults---------------' + Upsertresults);
		return Upsertresults.getId(); // May be I will return the status of DML operation
	}

	private static void DMLupdateOrInsertQueryForList(List<SObject> sObjectListToUpdate){
		// This method is responsible for updating the objects
		try{
			Database.upsert(sObjectListToUpdate);
		} catch (Exception Ex){
		}
	}

	public static string DMLupdateOrInsertQuery(SObject sObjectsToUpdate){
		string strResult;
		// This method is responsible for updating the objects
		Database.UpsertResult Upsertresults = Database.upsert(sObjectsToUpdate);
		if (Upsertresults.isSuccess()){
			strResult = Upsertresults.isCreated() ? ProviderConstants.INSERTSUCCESS : ProviderConstants.UPDATESUCCESS;
		} else{
			strResult = ProviderConstants.ERROR;
		}
		return strResult; // May be I will return the status of DML operation
	}

	private static sObject populateFieldsandValuesForMap(sObject objSobjectToPopulate, Map<String, String> objMapFields){
		try{
			for (String strKey : objMapFields.keySet()){
				//Loop through the map and forming Map
				objSobjectToPopulate.put(strKey, objMapFields.get(strKey));
			}
		} catch (Exception Ex){
		}
		return objSobjectToPopulate;
	}

	public static string getSelectQuery(string SobjectApiName, string strSelectFields, integer intLimit, string strqueryParameters){
		//Method responsible for framing the eact query against the sObject which we were passing
		String query;
		try{
			String commaSepratedFields = '';
			//If select feilds are supplied from front end then return only that
			// Else return all the columns
			if (strSelectFields == null){
				Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
				Map<String, Schema.SObjectField> fieldMap = schemaMap.get(SobjectApiName).getDescribe().fields.getMap();
				for (String fieldName : fieldMap.keyset()){
					if (commaSepratedFields == null || commaSepratedFields == ''){
						commaSepratedFields = fieldName;
					} else{
						commaSepratedFields = commaSepratedFields + ', ' + fieldName;
					}
				}
				//For
			} else{
				commaSepratedFields = strSelectFields;
			}
			// End if
			query = 'SELECT ' + commaSepratedFields + ' FROM ' + SobjectApiName;
			query = strqueryParameters != null ? query + strqueryParameters : query;
			query = intLimit > 0 ? query + ' LIMIT ' + intLimit : query;
		
		} catch (Exception Ex){
			throw Ex;
		} finally{
		}
		return query;
	}

	// getSelectQuery method end
	// wrapper class for pick list entry
	public with sharing class FetchValueWrapper{
		@auraEnabled
		public string label{
			get;
			set;
		}

		@auraEnabled
		public string value{
			get;
			set;
		}
	}

	// FetchValueWrapper class end
}

//DMLOperationsHandler
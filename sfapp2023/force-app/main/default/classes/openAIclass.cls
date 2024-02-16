public with sharing class openAIclass {
    @AuraEnabled
    public static string textcompletionCeck(string texttoCheck) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.openai.com/v1/completions');
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer EBVikZUoGDuJyXkKczLrT3BlbkFJg7BxoKXwGoFWLJXaZ5HQ');
        request.setHeader('Content-Type', 'application/json');
        string requestBody = '{"model":"text-davinci-003","prompt":"' + texttoCheck + '","max_tokens":4000,"temperature":0}';
        request.setBody(requestBody);
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            // Deserialize the JSON response
            Map<String, Object> responseRetrieved = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
            List<Object> choices = (List<Object>)responseRetrieved.get('choices');
            
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> firstChoice = (Map<String, Object>)choices[0];
                String firstChoiceText = (String)firstChoice.get('text');
                System.debug('Response check --> ' + firstChoiceText);
                return firstChoiceText;
            }
        }

        // If there's an issue with the response or choices are empty, return null or handle the error accordingly.
        return null;
    }
}
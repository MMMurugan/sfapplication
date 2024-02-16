@isTest
global with sharing class GoogleTranslateHttpCalloutMockImpl implements HttpCalloutMock {

    global HttpResponse respond(HttpRequest req) {
        // Create a fake response .
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"status":"OK","translations":[{"translatedText":"Esto es una prueba"}]}');
        res.setStatusCode(200);

        return res;
    }
}
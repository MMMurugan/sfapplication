public with sharing class ReportGeneratorController {
    @AuraEnabled(cacheable=true)
    public static Id generatePDFContent(Id recordId) {
        // Fetch data and construct the content for the PDF
        String reportContent = 'This is the content for the PDF report.';

        // Generate a PDF Blob from the content
        Blob pdfBlob = Blob.valueOf(reportContent);

        // Create an Attachment or Document record to store the PDF
        Attachment attachment = new Attachment();
        attachment.ParentId = recordId; // Set the parent record Id if needed
        attachment.Name = 'report.pdf';
        attachment.Body = pdfBlob;
        insert attachment;

        return attachment.Id; // Return the Id of the created Attachment or Document record
    }
}
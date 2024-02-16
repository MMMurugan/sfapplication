import { LightningElement, track } from 'lwc';

const columns = [
    { label: 'PDF1', fieldName: 'pdf1', type: 'text' },
    { label: 'PDF2', fieldName: 'pdf2', type: 'text' },
];

export default class PDFComparisonComponent extends LightningElement {
    @track file1;
    @track file2;
    @track comparisonResults;

    handleFile1Change(event) {
        this.file1 = event.target.files[0];
    }

    handleFile2Change(event) {
        this.file2 = event.target.files[0];
    }

    handleCompare() {
        if (this.file1 && this.file2) {
            // Read the contents of the files
            this.readFileContents(this.file1)
                .then(content1 => {
                    return this.readFileContents(this.file2)
                        .then(content2 => {
                            // Compare the contents word by word
                            const words1 = content1.split(/\s+/);
                            const words2 = content2.split(/\s+/);

                            // Find differences
                            this.comparisonResults = this.findDifferences(words1, words2);
                        });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            console.error('Please select both files for comparison.');
        }
    }

    readFileContents(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsText(file);
        });
    }

    findDifferences(words1, words2) {
        const differences = [];
        let i = 0;
        while (i < words1.length || i < words2.length) {
            if (words1[i] !== words2[i]) {
                differences.push({
                    id: i,
                    pdf1: words1[i] || '',
                    pdf2: words2[i] || '',
                });
            }
            i++;
        }
        return differences;
    }

    get formattedComparisonResults() {
        return this.comparisonResults.map(result => {
            return {
                ...result,
                pdf1: result.pdf1 || 'No data',
                pdf2: result.pdf2 || 'No data',
            };
        });
    }

    get columns() {
        return columns;
    }
}
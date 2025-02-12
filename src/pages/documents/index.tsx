import React, { useState } from "react";
import { CodeGenerator } from "@/components/documents/CodeGenerator";
import { DocumentType } from "@/lib/types/documents";

const DocumentsPage = () => {
  const [companyPrefix, setCompanyPrefix] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>("PR");
  const [sequenceNumber, setSequenceNumber] = useState("001");

  const documentCode = `${companyPrefix}-${documentType}-${sequenceNumber}`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Document Management</h1>

        <div className="grid gap-6">
          <CodeGenerator
            companyPrefix={companyPrefix}
            onPrefixChange={setCompanyPrefix}
            documentType={documentType}
            onTypeChange={setDocumentType}
            sequenceNumber={sequenceNumber}
            onSequenceChange={setSequenceNumber}
            preview={documentCode}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;

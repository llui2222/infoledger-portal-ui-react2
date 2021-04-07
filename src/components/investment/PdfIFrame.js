import React from 'react';

const PdfIFrame = () => (
    <iframe
        title="Pdf file"
        src="http://www.africau.edu/images/default/sample.pdf"
    />
);
export default React.memo(PdfIFrame);
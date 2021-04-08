import React from 'react';

const PdfIFrame = ({src= 'http://www.africau.edu/images/default/sample.pdf'}) => (
    <iframe
        title="Pdf file"
        src={src}
        data-testid="iframe"
    />
);
export default React.memo(PdfIFrame);
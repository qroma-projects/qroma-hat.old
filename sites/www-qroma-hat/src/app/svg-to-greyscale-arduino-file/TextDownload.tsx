import React, { useState } from 'react';

interface Props {
    text: string,
    fileName: string,
}

export const TextDownload: React.FC<Props> = ({ text, fileName }) => {
    const [loading, setLoading] = useState(false);

    const fileContents = new Blob([text], { type: 'text/plain' });

    var [effectSvgImageDataUrl, setEffectSvgImageDataUrl] = useState("");
    let reader = new FileReader();
    reader.readAsDataURL(fileContents);
    reader.onload = function() {
      const imageDataUrl = reader.result as string;
      setEffectSvgImageDataUrl(imageDataUrl);
    };

    const handleClick = () => {
        setLoading(true);
        const element = document.createElement("a");
        element.href= effectSvgImageDataUrl;
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        setTimeout(() => {
            setLoading(false);
            document.body.removeChild(element);
        }, 2000);
    }

    return (
        <>
            <button disabled={loading} onClick={handleClick}>
                {loading ? "Loading..." : "Download"}
            </button>
        </>
    );
};

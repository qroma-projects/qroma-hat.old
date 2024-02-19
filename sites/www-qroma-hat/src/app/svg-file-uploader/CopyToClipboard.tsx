import React, { useState } from 'react';


export const CopyToClipboard = ({ text }: {text: string}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
    });
  }

  return (
    <>
      <button onClick={handleClick}>Copy to clipboard</button>
      {isCopied && <p>Copied to clipboard!</p>}
    </>
  );
}

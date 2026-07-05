import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

// show password input feature
export const ShowPassword = ({ setStatus, currentStatus }) => {
  return (
    <>
      <button className="mt-1.5" onClick={() => setStatus((p) => !p)}>
        {currentStatus ? <Eye size={15} /> : <EyeClosed size={15} />}
      </button>
    </>
  );
};

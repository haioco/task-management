import React, {useState, useEffect} from 'react';

const FileUploadProject = () => {
  const [file, setFile] = useState<HTMLInputElement | any>()
  useEffect(() => {
    console.log('sdsd')
  }, [file])
  
return (
    <div>
      <input onChange={setFile} type={'file'} />
    </div>
  );
};

export default FileUploadProject;

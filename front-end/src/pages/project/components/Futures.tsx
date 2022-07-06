import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const Quilly = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>loadin</p> });

const FeatureEditorBox = (props:any) => {
  const [Feature, setFeature] = useState('');


  useEffect(() => {
    props.onChange(Feature)
  }, [Feature])


  return (
    <div dir={'rtl'}>
      <Quilly placeholder={' مزیت ها پروژه'} theme="snow" value={Feature}  onChange={setFeature} />
    </div>
  );
};

export default FeatureEditorBox;

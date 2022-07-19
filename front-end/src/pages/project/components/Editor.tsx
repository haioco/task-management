import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const Quilly = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>loadin</p> });

const TextEditorBox = (props:any) => {
  const [description, setDescription] = useState('');


  useEffect(() => {
    props.onChange(description)
  }, [description])


  return (
    <div dir={'rtl'}>
      <Quilly defaultValue={props.description} placeholder={'توضیحات پروژه'} theme="snow" value={description}  onChange={setDescription} />
    </div>
  );
};

export default TextEditorBox;

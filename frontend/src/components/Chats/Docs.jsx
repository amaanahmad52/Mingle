import React, { useContext, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { MesssageContext } from '../../Context/MessageContext';
import AddIcon from '@mui/icons-material/Add';
import Imoji from '@mui/icons-material/InsertEmoticon';

const Docs = ({ file,setfile }) => {
  const { docsOpen, setDocsOpen } = useContext(MesssageContext);
  const [fileURL, setFileURL] = useState('');
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
  };
  const formatSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    else if (sizeInBytes < 1024 * 1024)
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    else
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <div className="w-[55%] fixed top-18 z-[2001] h-[600px] right-0  rounded-lg flex flex-col justify-center items-center">
      <div className="w-full h-[500px] bg-white border  flex flex-col">
        {/* Header */}
        <div className="w-full h-[50px] bg-gray-200 flex items-center px-4">
          <CloseIcon className="text-black cursor-pointer" onClick={() => setDocsOpen(!docsOpen)} />
          <h1 className="text-black font-poppins font-bold text-lg text-center w-full">{file?.name}</h1>
        </div>

        {/* File Preview */}
        <div className="w-full h-[400px] bg-white border flex flex-col justify-center items-center">
          <div className="w-3/4 m-auto h-[300px] flex items-center border-2 border-dotted border-gray-400 rounded-2xl overflow-hidden gap-2">
            {fileURL.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
             <div className="w-full h-[100px] bg-gray-100 rounded shadow overflow-hidden flex items-center justify-center">
             <img
               src={fileURL}
               alt="user avatar"
               className="w-full h-full object-fit"
               // onError={(e) => { e.target.src = "https://i.pravatar.cc/100"; }}
             />
           </div>
           
            ) : (
              <iframe
                src={fileURL}
                title="Document Viewer"
                className="w-full h-full border-0"
                sandbox=""
              />
            )}
          </div>
          <h1 className="text-black font-poppins font-bold text-lg text-center w-full ">
            {formatSize(file?.size)}
          </h1>
        </div>

        {/* Caption Input */}
        <div className="w-full h-[56px] flex items-center justify-center relative px-4">
          <input
            type="text"
            className="w-3/4 h-[40px] border rounded-lg px-3 pr-10"
            placeholder="Add a Caption"
          />
          <Imoji className="absolute right-27 text-cyan-600 scale-150 cursor-pointer" />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[100px] bg-white border-t flex items-center justify-between px-4">
        {/* File Preview Thumbnails */}
        <div className="w-[85%] h-[90px] flex items-center overflow-x-auto overflow-y-hidden gap-2">
  {files.map((file, index) => {
    const url = URL.createObjectURL(file);
    const isImage = file.name.match(/\.(jpeg|jpg|png|gif|webp)$/i);
    const isVideo = file.name.match(/\.(mp4|webm|ogg)$/i);

    return (
      <div key={index} className="min-w-[100px] h-[60px] bg-gray-100 m-y-4 rounded hover:ring-2 ring-cyan-600 flex items-center justify-center" onClick={() => {setfile(file) }}>
        {isImage ? (
          <img src={url} alt="thumb" className="w-full h-full object-fit" />
        ) : isVideo ? (
          <video controls className="w-full h-full object-contain">
            <source src={url} />
          </video>
        ) : (
          <iframe src={url} title={`preview-${index}`} className="w-full h-full" />
        )}
      </div>
    );
  })}
</div>


        {/* Add File Button */}
        <div className="flex items-center justify-center w-[50px] h-[50px] bg-cyan-600 rounded-lg shadow-lg ml-4">
          <input type="file" multiple onChange={handleFileChange} className="hidden" ref={inputRef} />
          <AddIcon className="text-amber-800 cursor-pointer" onClick={() => inputRef.current.click()} />
        </div>

        {/* Send Button */}
        <div className="w-[60px] h-[60px] bg-green-500 rounded-full flex justify-center items-center ml-4">
          <SendIcon className="text-white cursor-pointer" onClick={() => setDocsOpen(!docsOpen)} />
        </div>
      </div>
    </div>
  );
};

export default Docs;

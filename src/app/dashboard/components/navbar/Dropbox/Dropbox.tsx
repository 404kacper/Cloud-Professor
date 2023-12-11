'use client';
import React, {
  useState,
  useRef,
  ChangeEvent,
  DragEvent,
  useContext,
} from 'react';

import KeysContext from '@/keysContext/KeysContext';
import DataContext from '@/dataContext/DataContext';

import stylesDropbox from './Dropbox.module.scss';
import Image from 'next/image';

export default function Dropbox() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { uploadFile } = useContext(DataContext);
  const { publicKey } = useContext(KeysContext);

  // This method encrypts files data:
  //  - with different symmetric key generated for each file
  //  - files are uploaded by user (either by clicking or dragging item over the dropbox)
  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        // Some safety checks
        if (!e.target?.result || !(e.target.result instanceof ArrayBuffer)) {
          console.error('FileReader did not load a valid ArrayBuffer');
          return;
        }

        // Loading the file data into an ArrayBuffer
        const arrayBuffer = e.target.result;

        try {
          await uploadFile(arrayBuffer, publicKey, file.name, file.size);
        } catch (error) {
          console.error('Error processing file:', error);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${stylesDropbox.dropboxContainer} ${
        isDragOver ? stylesDropbox.dropboxContainerActive : ''
      }`}
      onClick={openFileDialog}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className={stylesDropbox.textContainer}>
        <div className={stylesDropbox.icon}>
          <Image src='/dash/drop-cloud.svg' alt='Upload Icon' fill />
        </div>
        <div className={stylesDropbox.lead}>Upload Documents</div>
        <div className={stylesDropbox.leadSecondary}>
          Text files must be lesser than{' '}
          <span className={stylesDropbox.leadSecondaryBolder}>2MB</span>
        </div>
      </div>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={onFileInputChange}
        multiple
      />
    </div>
  );
}

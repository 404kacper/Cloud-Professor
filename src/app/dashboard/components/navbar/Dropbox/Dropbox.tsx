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
import AuthContext from '@/context/AuthContext';

import stylesDropbox from './Dropbox.module.scss';
import Image from 'next/image';

export default function Dropbox({ forModal }: { forModal?: boolean }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { uploadFile } = useContext(DataContext);
  const { publicKey } = useContext(KeysContext);
  const {
    clickedFriend: { key, email },
  } = useContext(AuthContext);

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
          // file sent to a friend
          if (forModal) {
            await uploadFile(arrayBuffer, key, file.name, file.size, email);
          } else {
            // file sent to user by himself
            await uploadFile(arrayBuffer, publicKey, file.name, file.size);
          }
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
      // Reset the file input after handling files
      // Makes it so that browser doesn't cache files & allows uploading the same file twice
      event.target.value = '';
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
      style={
        forModal
          ? { border: 'solid black 3px', width: '100%', marginLeft: '0' }
          : {}
      }
    >
      <div
        className={stylesDropbox.textContainer}
        style={forModal ? { color: '#000' } : {}}
      >
        <div className={stylesDropbox.icon}>
          {forModal ? (
            <Image src='/dash/drop-cloud-dark.svg' alt='Upload Icon' fill />
          ) : (
            <Image src='/dash/drop-cloud.svg' alt='Upload Icon' fill />
          )}
        </div>
        <div className={stylesDropbox.lead}>Upload Documents</div>
        <div
          className={stylesDropbox.leadSecondary}
          style={forModal ? { color: 'rgba(0,0,0,0.65)' } : {}}
        >
          Files must be lesser than{' '}
          <span
            className={stylesDropbox.leadSecondaryBolder}
            style={forModal ? { color: '#000' } : {}}
          >
            250 MB
          </span>
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

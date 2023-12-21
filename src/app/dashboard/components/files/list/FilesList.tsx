import React, { useContext } from 'react';
import styles from './FilesList.module.scss';
import FilesListItem from './item/FilesListItem';
import { ListItemTypes } from './item/FilesListItem';

import DataContext from '@/dataContext/DataContext';

export enum ListTypes {
  DOWNLOAD = 'download',
  UPLOAD = 'upload',
}

export default function FilesList({
  firstLabel,
  secondLabel,
  thirdLabel,
  fourthLabel,
  typeOfList,
}: {
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  fourthLabel: string;
  typeOfList: ListTypes;
}) {
  // Maps file extensions to the format of the list item type
  // - these are the handled file extensions by the UI
  // - application flow allows for handling of all types of files
  const extensionToFormatMap: { [key: string]: ListItemTypes } = {
    txt: ListItemTypes.TXT,
    docx: ListItemTypes.DOCX,
    default: ListItemTypes.DEFAULT,
  };

  const { myFiles, toMeFiles } = useContext(DataContext);

  const renderItem = (file: any) => {
    const { extension, name } = extractExtension(file.fileName);

    let fileFormat =
      extensionToFormatMap[extension.toLowerCase()] || ListItemTypes.DEFAULT;

    if (typeOfList === ListTypes.UPLOAD) {
      return (
        <FilesListItem
          key={file.id}
          type={ListTypes.UPLOAD}
          itemId={file.id}
          itemFormat={fileFormat}
          itemName={name}
          itemSize={Number(file.size)}
          itemKeySize={Number(file.keySize)}
          itemDate={file.createdAt}
          itemKey={file.key}
        />
      );
    } else if (typeOfList === ListTypes.DOWNLOAD) {
      return (
        <FilesListItem
          key={file.id}
          type={ListTypes.DOWNLOAD}
          itemId={file.id}
          itemFormat={fileFormat}
          itemName={name}
          itemSize={Number(file.size)}
          itemKeySize={Number(file.keySize)}
          itemKey={file.key}
          itemAuthorEmail={file.author.email}
        />
      );
    }
  };

  const extractExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.');

    if (lastDotIndex === -1) {
      // No extension found
      return { extension: '', name: fileName };
    } else {
      const extension = fileName.substring(lastDotIndex + 1);
      const name = fileName.substring(0, lastDotIndex);
      return { extension, name };
    }
  };

  return (
    <>
      <div className={styles.listHeaderContainer}>
        <div className={styles.headerNameLabel}>{firstLabel}</div>
        <div className={styles.headerKeyLabel}>{secondLabel}</div>
        <div className={styles.headerSizeLabel}>{thirdLabel}</div>
        <div className={styles.headerDateLabel}>{fourthLabel}</div>
      </div>
      <div className={styles.listContainer}>
        {typeOfList === ListTypes.UPLOAD
          ? myFiles && myFiles.map((file: any) => renderItem(file))
          : typeOfList === ListTypes.DOWNLOAD
          ? toMeFiles && toMeFiles.map((file: any) => renderItem(file))
          : null}
      </div>
    </>
  );
}

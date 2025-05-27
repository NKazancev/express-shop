import { CSSProperties, FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

import useFilePreview from '@shared/hooks/useFilePreview';

import styles from './InputFile.module.css';

type TInputFile = {
  name: string;
  label: string;
  file: FileList | string;
  multiple?: boolean;
  containerStyle?: CSSProperties;
  register: UseFormRegister<any>;
};

const InputFile: FC<TInputFile> = ({
  name,
  label,
  multiple = false,
  file,
  containerStyle,
  register,
}) => {
  const dataUrl = useFilePreview(file);

  return (
    <div style={containerStyle} className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        <span>{label}</span>
        <input
          type="file"
          id={name}
          multiple={multiple}
          className="visually-hidden"
          {...register(name)}
        />
      </label>

      {!multiple && dataUrl.length === 1 && (
        <div className={styles.preview}>
          <img src={dataUrl[0]} alt="preview-image" width={130} />
        </div>
      )}

      {multiple && (
        <div className={styles.previews}>
          {dataUrl?.map((url, index) => {
            return (
              <img key={index} src={url} alt="preview-image" width={100} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputFile;

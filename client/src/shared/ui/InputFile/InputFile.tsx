import { CSSProperties, FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import useFilePreview from '@shared/hooks/useFilePreview';

import styles from './InputFile.module.css';

type TInputFile = {
  name: string;
  label: string;
  multiple?: boolean;
  file: FileList | string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
  containerStyle?: CSSProperties;
  previewPosition?: 'absolute' | 'static';
};

const InputFile: FC<TInputFile> = ({
  name,
  label,
  multiple = false,
  file,
  register,
  required = true,
  error,
  containerStyle,
  previewPosition = 'absolute',
}) => {
  const dataUrl = useFilePreview(file);

  const previewStyle: CSSProperties =
    previewPosition === 'static'
      ? { position: 'static', paddingTop: '14px' }
      : { position: 'absolute', top: '68px', left: '0px' };

  const validateQuantity = (images: FileList) => {
    const maxQuantity = 12;
    if (images.length > maxQuantity) {
      return `You can only upload a maximum of ${maxQuantity} images.`;
    }
  };

  return (
    <div style={containerStyle} className={styles.container}>
      <label
        htmlFor={name}
        className={styles.label}
        style={{ borderColor: error ? '#ff7474' : '#8b8b8b' }}
      >
        <span>{label}</span>
        <input
          type="file"
          id={name}
          multiple={multiple}
          className="visually-hidden"
          {...register(name, { required, validate: validateQuantity })}
        />
        {error?.message && (
          <strong className={styles.error}>{error?.message}</strong>
        )}
      </label>

      {!multiple && dataUrl.length === 1 && (
        <div style={previewStyle}>
          <img src={dataUrl[0]} alt="preview-image" width={130} />
        </div>
      )}

      {multiple && dataUrl.length >= 1 && (
        <div style={previewStyle} className={styles.previews}>
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

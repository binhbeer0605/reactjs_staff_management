import { forwardRef, useState } from 'react';
import images from '@/assets/images';

import classNames from 'classnames';
import styles from './Image.module.scss';

const Image = forwardRef(
    (
        {
            src,
            alt,
            className,
            fallback: customFallback = images.noImage,
            ...props
        },
        ref,
    ) => {
        const [, setFallback] = useState('');

        const handleError = () => {
            setFallback(customFallback);
        };

        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={customFallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    },
);

export default Image;

import classNames from 'classnames/bind';
import styles from './Loadding.module.scss';

const cx = classNames.bind(styles);

function Loadding() {
    return (
        <div className={cx('background')}>
            <div className={cx('e-loadholder')}>
                <div className={cx('m-loader')}>
                    <span className={cx('e-text')}>Loading</span>
                </div>
            </div>
            <div className={cx('particleCanvas-Blue')}></div>
            <div className={cx('particleCanvas-White')}></div>
        </div>
    );
}

export default Loadding;

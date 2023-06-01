import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '@/components/Image/Image';
import Popup from 'reactjs-popup';
import PopupEmp from '../PopupEmp/PopupEmp';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const [reload, setReload] = useState(false);
    return (
        <Popup
            modal
            trigger={
                <div className={cx('wrapper')}>
                    <Image className={cx('avatar')} alt={data.emp_Nm} />
                    <div className={cx('info')}>
                        <h4 className={cx('name')}>
                            <span>{data.emp_Nm}</span>
                            {data.role === 'Admin' && (
                                <FontAwesomeIcon
                                    className={cx('check')}
                                    icon={faCheckCircle}
                                />
                            )}
                        </h4>
                        <span className={cx('username')}>{data.dept_Code}</span>
                    </div>
                </div>
            }
        >
            {(close) => (
                <PopupEmp
                    reload={reload}
                    setReload={setReload}
                    dataInput={data}
                    close={close}
                />
            )}
        </Popup>
    );
}

export default AccountItem;

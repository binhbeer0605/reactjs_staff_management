import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { Fragment, useEffect, useState } from 'react';
import { useMyContext } from '@/hooks';
import axios from 'axios';
import { getRoleUserByToken } from '@/function';

const cx = classNames.bind(styles);

function Sidebar() {
    const [menu, setMenu] = useState([]);
    const [menulv2, setMenulv2] = useState([]);
    const token = localStorage.getItem('token');
    const role = getRoleUserByToken(token);
    useEffect(() => {
        axios.get(`https://localhost:7180/api/Menu/${role}`).then((res) => {
            setMenu(res.data);
            setMenulv2(res.data.filter((i) => i.mN_LV !== '01'));
        });
    }, [role]);
    return (
        <aside
            className={
                useMyContext()[0].showMenu
                    ? cx('wrapper', 'show')
                    : cx('wrapper', 'hide')
            }
        >
            {menu.length ? (
                <Menu>
                    <>
                        {menu.map((item) =>
                            item.mN_LV === '01' ? (
                                <MenuItem
                                    key={item.mN_NO}
                                    title={item.mN_NM}
                                    to={item.path}
                                    icon={item.icon}
                                    activeIcon={item.icoN_ACTIVE}
                                    menuChildren={menulv2.filter(
                                        (i) => i.uP_MN_NO === item.mN_NO,
                                    )}
                                ></MenuItem>
                            ) : null,
                        )}
                    </>
                </Menu>
            ) : (
                <Fragment />
            )}
        </aside>
    );
}

export default Sidebar;

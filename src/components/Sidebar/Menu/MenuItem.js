import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import * as Icons from '@/components/Icons';
import { useMyContext } from '@/hooks';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon, menuChildren }) {
    const DynamicFaIcon = ({ name }) => {
        const IconComponent = Icons[name];

        if (!IconComponent) {
            // Return a default one
            return;
        }

        return <IconComponent />;
    };

    const [state] = useMyContext();

    return (
        <NavLink
            to={to}
            className={(navData) =>
                cx('menu-item', { active: navData.isActive })
            }
        >
            <span className={cx('icon')}>{<DynamicFaIcon name={icon} />}</span>
            <span className={cx('active-icon')}>
                {<DynamicFaIcon name={activeIcon} />}
            </span>
            {state.showMenu ? (
                <span className={cx('title')}>{title}</span>
            ) : null}
            {menuChildren.length > 0 && state.showMenu ? (
                <ul className={cx('list-children')}>
                    {menuChildren.map((item) => (
                        <Link
                            key={item.mN_NO}
                            to={item.path}
                            className={cx('menu-item')}
                        >
                            {state.showMenu ? (
                                <span className={cx('title')}>
                                    {item.mN_NM}
                                </span>
                            ) : null}
                        </Link>
                    ))}
                </ul>
            ) : null}
        </NavLink>
    );
}

export default MenuItem;

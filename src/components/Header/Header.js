import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '@/components/Search';
import Button from '@/components/Button';
import images from '@/assets/images';
import Menu from '@/components/Popper/Menu';
import { IconBars, IconGear, IconLanguage, IconLogout, IconUser } from '@/components/Icons';
import { useMyContext } from '@/hooks';
import { actions } from '@/store';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <IconLanguage width={20} height={20} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Anh',
                },
            ],
        },
    },
];

function Header() {
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handle
                break;

            case 'logout':
                window.localStorage.clear();
                window.location.href = '/';
                break;
            default:
        }
    };
    const userMenu = [
        {
            icon: <IconUser width={20} height={20} />,
            title: 'View Profile',
            to: '/user',
        },
        {
            icon: <IconGear width={20} height={20} />,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <IconLogout width={20} height={20} />,
            title: 'Log out',
            type: 'logout',
            separate: true,
        },
    ];

    const [state, dispatch] = useMyContext();
    const { showMenu } = state;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-box')}>
                <Button
                    circle
                    onClick={() => {
                        dispatch(actions.setShowHideMenu(showMenu));
                    }}
                >
                    <IconBars />
                </Button>
            </div>

            <Search />

            <Menu items={userMenu} onChange={handleMenuChange}>
                <div className={cx('actions')}>
                    <div className={cx('avatar-box')}>
                        <img className={cx('avatar')} src={images.avatar} alt="avt" />
                    </div>
                </div>
            </Menu>
        </div>
    );
}

export default Header;

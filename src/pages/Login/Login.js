import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useRef, useState } from 'react';
import Button from '@/components/Button';
import axios from 'axios';

const cx = classNames.bind(styles);

function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setShowLoadding] = useState(false);
    const [alert, setAlert] = useState('');

    const inputUser = useRef();
    const inputPass = useRef();

    const submitLogin = async (e) => {
        e.preventDefault();
        setShowLoadding(true);
        await axios
            .post('https://localhost:7180/api/Login', {
                UserName: username,
                Password: password,
            })
            .then((res) => res.data.data)
            .then((token) => {
                setToken(token);
            })
            .catch(() => {
                setShowLoadding(false);
                setAlert('Invalid Username or Password!');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={submitLogin}>
                    <div className={cx('form-control')}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            ref={inputUser}
                            placeholder="UserName"
                        />
                    </div>

                    <div className={cx('form-control')}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ref={inputPass}
                            placeholder="Password"
                        />
                    </div>

                    {alert ? (
                        <div className={cx('error-message')}>{alert}</div>
                    ) : null}

                    <Button primary submit className={cx('button-submit')}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;

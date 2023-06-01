import React from 'react';
import Typewriter from 'typewriter-effect';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Welcome to the staff management page</h1>
                <h3>
                    <Typewriter
                        options={{
                            strings: [
                                'View',
                                'Create',
                                'Edit',
                                'Delete',
                                'All functions are available here!',
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 2,
                        }}
                    />
                </h3>
            </div>
        </div>
    );
}

export default Home;

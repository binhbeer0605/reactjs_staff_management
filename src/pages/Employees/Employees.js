import classNames from 'classnames/bind';
import styles from './Employees.module.scss';
import Table from '@/components/Table';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import Popup from 'reactjs-popup';
import PopupEmp from '@/components/PopupEmp/PopupEmp';

const cx = classNames.bind(styles);

function Employees() {
    const [reload, setReload] = useState(false);
    const [emps, setEmps] = useState([]);
    const [empsFilter, setEmpsFilter] = useState([]);

    const [id, setId] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState(false);

    const idRef = useRef();
    const genderRef = useRef();
    const statusRef = useRef();

    const token = localStorage.getItem('token');
    useEffect(() => {
        axios
            .get('https://localhost:7180/api/Emp', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setEmps(res.data);
                setEmpsFilter(res.data);
            });
    }, [reload, token]);

    const handleSearch = () => {
        var result = [];
        if (id) {
            if (gender) {
                if (status) {
                    result = emps.filter(
                        (i) =>
                            i.emp_No.includes(id) &&
                            i.gender === gender &&
                            i.tit === 'Working',
                    );
                } else {
                    result = emps.filter(
                        (i) => i.emp_No.includes(id) && i.gender === gender,
                    );
                }
            } else {
                if (status) {
                    result = emps.filter(
                        (i) => i.emp_No === id && i.tit === 'Working',
                    );
                } else {
                    result = emps.filter((i) => i.emp_No.includes(id));
                }
            }
        } else {
            if (gender) {
                if (status) {
                    result = emps.filter(
                        (i) => i.gender === gender && i.tit === 'Working',
                    );
                } else {
                    result = emps.filter((i) => i.gender === gender);
                }
            } else {
                if (status) {
                    result = emps.filter((i) => i.tit === 'Working');
                } else {
                    result = emps;
                }
            }
        }
        if (result.length) {
            setEmpsFilter(result);
        } else {
            alert('Not found');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>Employee Infomation</span>
                <div>
                    <Button
                        onClick={handleSearch}
                        secondary
                        className={cx('button-new')}
                    >
                        Search
                    </Button>

                    <Popup
                        modal
                        trigger={
                            <Button secondary className={cx('button-new')}>
                                New
                            </Button>
                        }
                    >
                        {(close) => (
                            <PopupEmp
                                reload={reload}
                                setReload={setReload}
                                close={close}
                            />
                        )}
                    </Popup>
                </div>
            </div>
            <div className={cx('filter-box')}>
                <table className={cx('table')}>
                    <tbody className={cx('tbody')}>
                        <tr className={cx('tr')}>
                            <td className={cx('td-label')}>Employee ID</td>
                            <td className={cx('td-input')}>
                                <input
                                    value={id}
                                    ref={idRef}
                                    onChange={(e) => setId(e.target.value)}
                                    className={cx('input')}
                                />
                            </td>
                            <td className={cx('td-label')}>Gender</td>
                            <td className={cx('td-input')}>
                                <select
                                    value={gender}
                                    ref={genderRef}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={cx('select')}
                                >
                                    <option value="">Choose</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr className={cx('tr')}>
                            <td className={cx('td-label')}>Working</td>
                            <td className={cx('td-input')}>
                                <input
                                    value={status}
                                    ref={statusRef}
                                    onChange={(e) =>
                                        setStatus(e.target.checked)
                                    }
                                    className={cx('checkbox')}
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Table
                itemInPage={5}
                columnName={['ID', 'Employee Name', 'Gender', 'Birthday']}
                data={empsFilter}
                columnShow={[0, 1, 4, 5]}
                reload={reload}
                setReload={setReload}
            />
        </div>
    );
}

export default Employees;

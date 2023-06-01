import { useRef, useState } from 'react';
import Button from '@/components/Button';
import styles from './PopupEmp.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { formatDate, getRoleUserByToken } from '@/function';

const cx = classNames.bind(styles);

function PopupEmp({ close, reload, setReload, dataInput }) {
    const [name, setName] = useState(dataInput ? dataInput.emp_Nm : '');
    const [birthday, setBirthday] = useState(
        dataInput ? formatDate(dataInput.birthday) : '2000-01-01',
    );
    const [dept, setDept] = useState(dataInput ? dataInput.dept_Code : '00001');
    const [pos, setPos] = useState(dataInput ? dataInput.pos_Code : '00001');
    const [gender, setGender] = useState(dataInput ? dataInput.gender : 'Male');
    const [status, setStatus] = useState(dataInput ? dataInput.tit : 'Working');
    const [role, setRole] = useState(dataInput ? dataInput.role : 'Employee');

    const inputName = useRef();
    const inputBirthday = useRef();
    const inputDept = useRef();
    const inputPos = useRef();
    const inputGender = useRef();
    const inputStatus = useRef();
    const inputRole = useRef();

    const token = localStorage.getItem('token');
    const roleUser = getRoleUserByToken(token);

    const saveData = async () => {
        const data = {
            emp_Nm: name,
            birthday: birthday,
            dept_Code: dept,
            pos_Code: pos,
            gender: gender,
            tit: status,
            role: role,
        };
        if (!dataInput) {
            await axios
                .post('https://localhost:7180/api/Emp', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        alert('Add New Employee Successfully!');
                        setReload(!reload);
                        close();
                    }
                })
                .catch((err) => alert('Add New Employee Unsuccessfully!'));
        } else {
            await axios
                .put(
                    'https://localhost:7180/api/Emp/' + dataInput.emp_No,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        alert('Update Employee Successfully!');
                        setReload(!reload);
                        close();
                    }
                })
                .catch((err) => alert('Update Employee Unsuccessfully!'));
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('modal')}>
                <button className={cx('close')} onClick={close}>
                    &times;
                </button>
                <div className={cx('header')}>
                    {dataInput ? 'Update Employee' : 'New Employee'}{' '}
                </div>
                <div className={cx('content">')}>
                    <table className={cx('table')}>
                        <tbody className={cx('tbody')}>
                            <tr className={cx('tr')}>
                                <td className={cx('td-label')}>
                                    Employee Name
                                </td>
                                <td className={cx('td-input')}>
                                    <input
                                        className={cx('input')}
                                        value={name}
                                        ref={inputName}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </td>
                                <td className={cx('td-label')}>Birthday</td>
                                <td className={cx('td-input')}>
                                    <input
                                        className={cx('input')}
                                        value={birthday}
                                        ref={inputBirthday}
                                        onChange={(e) =>
                                            setBirthday(e.target.value)
                                        }
                                        type="date"
                                    />
                                </td>
                            </tr>
                            <tr className={cx('tr')}>
                                <td className={cx('td-label')}>Department</td>
                                <td className={cx('td-input')}>
                                    <select
                                        className={cx('select')}
                                        value={dept}
                                        onChange={(e) =>
                                            setDept(e.target.value)
                                        }
                                        ref={inputDept}
                                    >
                                        <option value="00001">1</option>
                                        <option value="00002">2</option>
                                        <option value="00003">3</option>
                                    </select>
                                </td>
                                <td className={cx('td-label')}>Position</td>
                                <td className={cx('td-input')}>
                                    <select
                                        className={cx('select')}
                                        value={pos}
                                        onChange={(e) => setPos(e.target.value)}
                                        ref={inputPos}
                                    >
                                        <option value="00001">1</option>
                                        <option value="00002">2</option>
                                        <option value="00003">3</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className={cx('tr')}>
                                <td className={cx('td-label')}>Gender</td>
                                <td className={cx('td-input')}>
                                    <select
                                        className={cx('select')}
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        ref={inputGender}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Orther">Orther</option>
                                    </select>
                                </td>
                                <td className={cx('td-label')}>Status</td>
                                <td className={cx('td-input')}>
                                    <select
                                        className={cx('select')}
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        ref={inputStatus}
                                    >
                                        <option value="Working">Working</option>
                                        <option value="None">None</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className={cx('tr')}>
                                <td className={cx('td-label')}>Role</td>
                                <td className={cx('td-input')}>
                                    <select
                                        className={cx('select')}
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        ref={inputRole}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Employee">
                                            Employee
                                        </option>
                                        <option value="User">User</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Button
                        disabled={roleUser === 'Admin' ? false : true}
                        secondary
                        className={cx('button-save')}
                        onClick={saveData}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PopupEmp;

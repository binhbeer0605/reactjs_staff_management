import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import Loadding from '@/components/Loadding';
import Button from '@/components/Button';
import { Fragment, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import PopupEmp from '@/components/PopupEmp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function Table({ columnName = [], data, columnShow, itemInPage, ...props }) {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(itemInPage);
    const [currentData, setCurrentData] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [totalPage, setTotalPage] = useState('');

    useEffect(() => {
        const currData = data.slice(min, max);
        setCurrentData(currData);
        setTotalPage(Math.ceil(data.length / itemInPage));
    }, [min, max, data, itemInPage]);

    // button chuyển trang
    const nextPage = () => {
        setMin((prev) => prev + itemInPage);
        setMax((prev) => prev + itemInPage);
        setNumPage((prev) => prev + 1);
    };
    const prevPage = () => {
        setMin((prev) => prev - itemInPage);
        setMax((prev) => prev - itemInPage);
        setNumPage((prev) => prev - 1);
    };

    const deleteItem = async (id) => {
        const submitDelete = window.confirm(
            'Are you sure you want delete this item?',
        );
        if (submitDelete) {
            const token = localStorage.getItem('token');
            await axios
                .delete(`https://localhost:7180/api/Emp/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        alert('Delete Employee Successfully!');
                        props.setReload(!props.reload);
                    }
                })
                .catch((err) => alert('Delete Employee Unsuccessfully!'));
        }
    };

    if (!data.length) {
        return <Loadding />;
    }

    return (
        <>
            <table className={cx('table')}>
                <thead className={cx('thead')}>
                    <tr key={'asd'} className={cx('tr-head')}>
                        {!columnName.length
                            ? Object.keys(data[0]).map((i, index) => {
                                  if (columnShow.includes(index)) {
                                      return (
                                          <th
                                              className={cx('th')}
                                              key={index + 'columnShow'}
                                          >
                                              {i}
                                          </th>
                                      );
                                  }
                                  return (
                                      <Fragment
                                          key={index + 'columnShow'}
                                      ></Fragment>
                                  );
                              })
                            : columnName.map((i, index) => (
                                  <th
                                      className={cx('th')}
                                      key={index + 'columnName'}
                                  >
                                      {i}
                                  </th>
                              ))}
                        <th colSpan={2} className={cx('th')}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className={cx('tbody')}>
                    {currentData.map((item, index) => (
                        <tr className={cx('tr')} key={index + 'tr'}>
                            {Object.values(item).map((i, idx) => {
                                if (columnShow.includes(idx)) {
                                    return (
                                        <td
                                            className={cx('td')}
                                            key={idx + 'td'}
                                        >
                                            {i}
                                        </td>
                                    );
                                } else {
                                    return (
                                        <Fragment key={idx + 'td'}></Fragment>
                                    );
                                }
                            })}
                            <Popup
                                modal
                                trigger={
                                    <td className={cx('td', 'center')}>
                                        <Button
                                            secondary
                                            className={cx('button-edit')}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                            />
                                        </Button>
                                    </td>
                                }
                            >
                                {(close) => (
                                    <PopupEmp
                                        reload={props.reload}
                                        setReload={props.setReload}
                                        close={close}
                                        dataInput={item}
                                    />
                                )}
                            </Popup>
                            <td className={cx('td', 'center')}>
                                <Button
                                    disabled={
                                        item.role === 'Admin' ? true : false
                                    }
                                    secondary
                                    className={cx('button-delete')}
                                    onClick={() => deleteItem(item.emp_No)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('actions')}>
                <Button
                    disabled={numPage === 1 ? true : false}
                    className={cx('button-navigation')}
                    onClick={prevPage}
                    secondary
                >
                    Prev
                </Button>
                <Button disabled primary>
                    {numPage}/{totalPage}
                </Button>
                <Button
                    disabled={numPage === totalPage ? true : false}
                    className={cx('button-navigation')}
                    onClick={nextPage}
                    secondary
                >
                    Next
                </Button>
            </div>
        </>
    );
}

export default Table;

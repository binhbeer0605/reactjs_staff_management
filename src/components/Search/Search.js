import { useState, useEffect, useRef } from 'react';
// classname * scss
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
// Import Tippy
import HeadLessTippy from '@tippyjs/react/headless';
// Import components
import { Wrapper as PopperWrapper } from '@/components/Popper';
import AccountItem from '@/components/AccountItem';
// Import FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
// Import hooks custom
import { useDebounce } from '@/hooks';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            setLoading(true);
            await axios
                .get('https://localhost:7180/api/emp/' + searchValue, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setSearchResult(res.data))
                .catch(() => setSearchResult([]));
            setLoading(false);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    return (
        /**
         * Using a wrapper <div> or <span> tag around the reference element solves 
        this by creating a new parentNode context. 
         */
        <div>
            <HeadLessTippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>List Result</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.emp_No} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search by Name ... "
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </HeadLessTippy>
        </div>
    );
}

export default Search;

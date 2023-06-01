import { useContext } from 'react';
import { MenuContext } from '@/store';

const useStore = () => {
    const [state, dispatch] = useContext(MenuContext);

    return [state, dispatch];
};

export default useStore;

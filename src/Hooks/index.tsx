import { useMemo, useState } from "react";

export const useGetStoreData = (key) => {
    const [data, setData] = useState(JSON.parse(window.localStorage.getItem(key)));
    useMemo(() => {
        if (data) {
            window.localStorage.setItem(key, JSON.stringify(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    function delLocal() {
        window.localStorage.removeItem(key);
        setData(JSON.parse(window.localStorage.getItem(key)));
    }

    return [data, setData, delLocal]
}
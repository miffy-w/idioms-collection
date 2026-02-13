import { useCallback, useEffect, useMemo, useState } from "react";
import en_locale from './t_en';

export function useLocale() {
    const [localeData, setLocaleData] = useState(en_locale);

    const locale = useMemo(() => {
        if (typeof window === 'undefined') {
            return 'en';
        }
        return navigator.language.toLowerCase().includes('zh') ? 'zh' : 'en';
    }, []);

    const getLocaleData = useCallback(async () => {
        try {
            const data = await import(`./t_${locale}`);
            return data.default;
        } catch (error) {
            return en_locale;
        }
    }, [locale]);

    useEffect(() => {
        getLocaleData().then(setLocaleData);
    }, [getLocaleData]);

    return localeData;
}

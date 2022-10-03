import { useCallback, useEffect, useState } from 'react';
import { Storage } from '../libs/storage';
import en from '../translation/en';
import hu from '../translation/hu';

export type Lang = 'en' | 'hu' | 'es';

export const useTranslate = () => {
    const [lang, setLang] = useState<Lang>('en');
    const [store, setLangStore] = useState<any>(en);
    const langStorage = new Storage('lang');

    useEffect(() => {
        const language = langStorage.get();

        if (language) {
            setLang(language);
        }
    }, []);

    useEffect(() => {
        switch (lang) {
            case 'en':
                return setLangStore(en);
            case 'hu':
                return setLangStore(hu);
            default:
                return setLangStore(en);
        }
    }, [lang]);

    const trans = useCallback((prop: string) => {
        return store?.[prop] || 'no translation found';
    }, [lang, store]);

    const setLanguage = (lang: Lang) => {
        langStorage.set(lang);
        setLang(lang);

        window.location.reload();
    };

    return { lang, trans, setLanguage };
};

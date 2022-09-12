import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { parseError } from '../libs/error-parsers';
import { handleErrors } from '../libs/handle-errors';
import { saveLogs } from '../libs/helpers';
import { Methods, Repository, RequestOptions } from '../libs/repository';

export interface ClientProps {
    isLoading: boolean;
    error: string;
    clearError: () => void;
    successMessage: string;
    clearMessage: () => void;
    client: (url: string, method?: Methods, options?: RequestOptions, query?: any) => Promise<any>;
    setHeader: (headerRecord: string[]) => void;
}

export const useClient = (env: 'api' | 'attachment' = 'api'): ClientProps => {
    const { token, signout, isLoggedIn } = useContext(AuthContext);
    const request: Repository = new Repository(token, env);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const setHeader = (headerRecord: string[]) => {
        request.setHeader(headerRecord[0], headerRecord[1]);
    };

    const clearError = () => {
        setError('');
    };

    const clearMessage = () => {
        setSuccessMessage('');
    };

    const client = async (url: string, method: Methods = 'GET', options?: RequestOptions, query?: any) => {
        try {
            setIsLoading(true);

            const response: any = await request.fetch(url, method, options, query);

            if (!response) {
                throw new Error('Something went wrong');
            }

            setIsLoading(false);

            setSuccessMessage(response?.message || 'Success');

            return response;
        } catch (e: any) {
            handleErrors({ hookLevelError: e, parsed: parseError(e) });
            const error = parseError(e);
            setError(error);
            setIsLoading(false);
            if (e?.code === 401 && isLoggedIn) {
                saveLogs('client');
                signout();
            }
        }
    };

    return { client, isLoading, error, clearError, successMessage, clearMessage, setHeader };
};

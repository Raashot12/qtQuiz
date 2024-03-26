import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 403) {
        toast.error(action.payload.data.error.message, {
          position: 'top-right',
        });
      }
      if (action.payload.status === 401) {
        Cookies.remove('accessToken');
        const loginPath = `${window.location.origin}/account/login`;
        window.location.href = loginPath;
      }
    }

    return next(action);
  };

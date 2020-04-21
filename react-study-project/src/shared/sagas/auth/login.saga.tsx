import { put, call, takeEvery } from 'redux-saga/effects';
import { AuthService } from '../../services/auth.service';
import { IResponseLoginAuthView } from '../../interfaces/auth/response-login-auth.view';

const authService = new AuthService();

export function* LoginSaga(): IterableIterator<{}> {
    yield takeEvery(`@@AUTH/LOGIN`, function* (action: any) {
        const response: IResponseLoginAuthView = yield call(authService.login, action.loginData);
        if(response.errorMessage || response.errorStatusCode){
            yield put({
                type: '@@AUTH/LOGIN_ERROR',
                error: response
            })
            return;
        }
        yield put({
            type: '@@AUTH/LOGIN_RECIVED',
            token: response.access_token
        })

        yield put({
            type: '@@AUTH/LOGIN_SUCCESS',
        })
    });
}
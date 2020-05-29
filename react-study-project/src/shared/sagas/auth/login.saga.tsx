import { put, call, takeEvery } from 'redux-saga/effects';
import { AuthService } from '../../services/auth.service';
import { IResponseLoginAuthView } from '../../interfaces/auth/response-login-auth.view';
import { AuthActionConstants } from '../../actions/constants/auth-action.constant';

const authService = new AuthService();

export function* LoginSaga(): IterableIterator<{}> {
    yield takeEvery(AuthActionConstants.AUTH_ACTION_LOGIN_MAIN, function* (action: any) {
        const response: IResponseLoginAuthView = yield call(authService.login, action.loginData);
        debugger
        if(response.errorMessage || response.errorStatusCode){
            yield put({
                type: AuthActionConstants.AUTH_ACTION_LOGIN_ERROR,
                error: response
            })
            return;
        }
        yield put({
            type: AuthActionConstants.AUTH_ACTION_LOGIN_RECIVED,
            token: response.access_token
        })

        yield put({
            type: AuthActionConstants.AUTH_ACTION_LOGIN_SUCCESS,
        })
    });
}
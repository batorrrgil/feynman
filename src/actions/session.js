export const AUTH_USER_SET = 'AUTH_USER_SET';


export function applySetAuthUser(authUser) {
    return {
        type: AUTH_USER_SET,
        authUser,
    }
};
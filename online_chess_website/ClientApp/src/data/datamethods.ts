import * as api from '../api/http_calls'

export async function signout(){
    sessionStorage.getItem('loginOperation') === 'offline' || api.axiosPost('api/sessions/delete', 
    {
        userId: parseInt(sessionStorage.getItem('userId')!)
    })
    document.cookie = `ST=0;expires=Fri, 18 September 2099 11:00:00 UTC; path=/`
    sessionStorage.setItem('loginOperation', '')
    sessionStorage.setItem('userId', '')
    sessionStorage.setItem('username', '')
    sessionStorage.setItem('sessionToken', '')
    sessionStorage.setItem('profileExists', '')
    sessionStorage.setItem('matchId', '')
    sessionStorage.setItem('userRank', '')
    sessionStorage.setItem('pfp', '')
}
let accessToken : string = "";

export const setAccessToken = (token : string) => {
    console.log(`access token is ${token}`);
    accessToken = token;
}

export const getAccessToken = () => {
    return accessToken;
}
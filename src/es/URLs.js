let urls = {
    api: "https://coursebooks.xyz",
    login: "https://coursebooks.xyz/users/login",
    register: "https://coursebooks.xyz/users/register",
    resetPasswordCallback: "https://www.researchcoder.com/reset-password.html"
};

function getUrl(name) {
    return urls[name];
}

export {
    getUrl
};

let urls = {};
urls['api'] = "https://dev.researchcoder.com/api";
urls['login'] = urls['api'] + "/users/login";
urls['register'] = urls['api'] + "/users/register";
urls['resetPasswordCallback'] = "https://dev.researchcoder.com/reset-password.html";

function getUrl(name) {
    return urls[name];
}

export {
    getUrl
};
let urls = {};
urls['api'] = "https://researchcoder.com/api";
urls['login'] = urls['api'] + "/users/login";
urls['register'] = urls['api'] + "/users/register";
urls['resetPasswordCallback'] = "https://researchcoder.com/reset-password.html";

function getUrl(name) {
    return urls[name];
}

export {
    getUrl
};
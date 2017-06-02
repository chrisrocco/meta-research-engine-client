let urls = {};
urls['api'] = "https://examples.com/api";
urls['login'] = urls['api'] + "/users/login";
urls['register'] = urls['api'] + "/users/register";
urls['resetPasswordCallback'] = "https://www.example.com/reset-password.html";

function getUrl(name) {
    return urls[name];
}

export {
    getUrl
};
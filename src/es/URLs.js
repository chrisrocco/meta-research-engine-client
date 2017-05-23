let urls = {};
urls['api'] = "https://coursebooks.xyz";
urls['login'] = urls['api'] + "/users/login";
urls['register'] = urls['api'] + "/users/register";
urls['resetPasswordCallback'] = "https://www.researchcoder.com/reset-password.html";

// urls['api'] = "https://api.researchcoder.com:8081";
// urls['login'] = urls['api'] + "/users/login";
// urls['register'] = urls['api'] + "/users/register";
// urls['resetPasswordCallback'] = "https://www.researchcoder.com/reset-password.html";


function getUrl(name) {
    return urls[name];
}

export {
    getUrl
};

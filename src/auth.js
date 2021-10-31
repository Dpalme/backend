const axios = require("axios"),
    jwt_decode = require("jwt-decode");

const genid = () => ((Math.random() * Math.pow(10, 11)) << 0);

const loginFunction = (config = {}) => async (req, res) => {
    const state = genid();
    req.session.state = state;
    const url =
        "https://signin.bindid-sandbox.io/authorize?" +
        "client_id=" +
        config.clientId +
        "&redirect_uri=" +
        config.baseUrl + '/callback' +
        "&state=" +
        state +
        "&bindid_custom_message=" +
        "Login en backend xd" +
        "&scope=bindid" +
        "&display=page" +
        "&prompt=login" +
        "&response_type=code";
    return res.redirect(url);
};

const callbackFunction = (config = {}) => async (req, res) => {
    try {
        if (req.query.state != req.session.state) {
            return res.status(403).redirect('./login');
        }
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("code", req.query.code);
        params.append("redirect_uri", config.redirectUri);
        params.append("client_id", config.clientId);
        params.append("client_secret", config.clientSecret);

        const tokenResponse = await axios({
            method: "post",
            url: "https://signin.bindid-sandbox.io/token",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: params
        });

        const token = jwt_decode(tokenResponse.data.id_token);
        req.session.userid = token.sub;
        return res.redirect(req.session.origin || '/');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};

const logoutFunction = (config = {}) => async (req, res) => {
    if (req.user) {
        req.session.destroy();
        return res.redirect('/login');
    }
    return res.redirect('/');
};

module.exports = {
    loginFunction,
    callbackFunction,
    logoutFunction
};
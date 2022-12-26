const resData = require("../../helper/response");
const axios = require("axios");

function getToken(authHeader) {
  let splitHeader;

  try {
    splitHeader = authHeader.split(" ");
  } catch (error) {
    console.log(error);
    return null;
  }

  if (splitHeader.length > 1) {
    return splitHeader[1];
  }

  return splitHeader[0];
}

const authorized = async (req, res, next) => {
  /*
#swagger.security = [{
 "bearerAuth": []
}]
*/
  const { authorization } = req.headers;

  if (authorization !== undefined && typeof authorization !== "string") {
    return null;
  }

  try {
    const token = getToken(authorization);

    const { data } = await axios({
      method: "post",
      url: process.env.API_AUTH_URL + "/verify-token",
      headers: {
        Authorization: token,
      },
    });

    req.user = {
      id: data.id,
      msisdn: data.msisdn,
      name: data.name,
      username: data.username,
    };
  } catch (error) {
    console.log(error);
    return res.status(401).json(resData.failed("unauthorized"));
  }

  next();
};

module.exports = authorized;

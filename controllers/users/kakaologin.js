const axios = require("axios");
const { user } = require("../models");

module.exports = {
  kakao: (req, res) => {
    const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
    const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const AUTHORIZATION_CODE = req.body.authorizationCode;
    const KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${AUTHORIZATION_CODE}`;

    let kakaoUserInfo = {};

    axios
      .post(
        KAKAO_TOKEN_URL,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data); // 토큰들 //? ok
        const { access_token, token_type, refresh_token } = response.data;
        const KAKAO_USERINFO_URL = `https://kapi.kakao.com/v2/user/me`;

        return axios
          .get(KAKAO_USERINFO_URL, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              accept: "application/json",
            },
          })
          .then(async (req, res) => {
            //  console.log(resp.data); // 카카오 유저 정보  //? ok
            if (res.data.kakao_account) {
              kakaoUserInfo.id = res.data.id;
              kakaoUserInfo.email = res.data.kakao_account.email;
              kakaoUserInfo.userName = res.data.kakao_account.profile.nickname;
            }
            const userInfo = await user.findOne({
              where: { email: res.data.kakao_account.email },
            });
            return userInfo;
          })
          .then((response) => {
            //  console.log("db에서 받아온 유저정보", response);
            if (response) {
              // 이미 가입한 유저 => DB 정보 보내기
              const { email, userName } = response.dataValues;
              const id = kakaoUserInfo.id;
              console.log("이미 가입한 유저", {
                email,
                userName,
                isRegistered: true,
                id: kakaoUserInfo.id,
              });
              res.status(200).json({ email, userName, id, isRegistered: true });
            } else {
              // 가입하지 않은 유저 => 카카오 정보 보내기
              // console.log("가입하지 않은 유저", {
              //   ...kakaoUserInfo, // id, email, userName
              //   isRegistered: false,
              // });
              res.status(200).json({ ...kakaoUserInfo, isRegistered: false });
            }
          });
      })
      .catch((e) => console.log(e));
  },
};
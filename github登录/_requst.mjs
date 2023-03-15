import axios from "axios";
import * as dotenv from "dotenv";

const env = dotenv.config().parsed ?? {};

console.log("env", env);

const code = "4b9c62f339b4956fa7e1";

const url = "https://github.com/login/oauth/access_token";
const _url =
  "https://github.com/login/oauth/access_token?" +
  `client_id=${env.CLIENT_ID}&` +
  `client_secret=${env.CLIENT_SECRET}&` +
  `code=${code}`;

function getToken() {
  axios
    .request({
      url: _url,
      method: "post",
      // query: {
      //   client_id: env.CLIENT_ID,
      //   client_secret: env.CLIENT_SECRET,
      //   code: code,
      // },
      timeout: 5 * 1000,
      headers: {
        accept: "application/json",
      },
    })
    .then((res) => {
      console.log("success", res);
    })
    .catch((err) => {
      console.log("err", err.code, err.response.status);
    });
}

// getToken()

// https://github.com/login/oauth/access_token?client_id=9e701a5e1d0e1ce29f4c&client_secret=8e15b12ee02cd375f526d83bfc78156d2e1dd49a&code=778ee3a6384a7cb7e16d

// data: {
//   access_token: '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',
//   token_type: 'bearer',
//   scope: 'user:email'
// }

const getInfo = async () => {
  const accessToken = "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";
  const result = await axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      accept: "application/json",
      Authorization: `token ${accessToken}`,
    },
  });
  console.log(result);
};

getInfo();

const _data = {
  login: "Otto-J",
  id: 9958583,
  node_id: "MDQ6VXNlcjk5NTg1ODM=",
  avatar_url: "https://avatars.githubusercontent.com/u/9958583?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/Otto-J",
  html_url: "https://github.com/Otto-J",
  followers_url: "https://api.github.com/users/Otto-J/followers",
  following_url: "https://api.github.com/users/Otto-J/following{/other_user}",
  gists_url: "https://api.github.com/users/Otto-J/gists{/gist_id}",
  starred_url: "https://api.github.com/users/Otto-J/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/Otto-J/subscriptions",
  organizations_url: "https://api.github.com/users/Otto-J/orgs",
  repos_url: "https://api.github.com/users/Otto-J/repos",
  events_url: "https://api.github.com/users/Otto-J/events{/privacy}",
  received_events_url: "https://api.github.com/users/Otto-J/received_events",
  type: "User",
  site_admin: false,
  name: "辛宝Otto",
  company: "DigitForce",
  blog: "ijust.cc",
  location: "Beijing, China",
  email: null,
  hireable: null,
  bio: "热爱前端，一往无前。",
  twitter_username: null,
  public_repos: 84,
  public_gists: 1,
  followers: 52,
  following: 246,
  created_at: "2014-11-26T06:23:06Z",
  updated_at: "2023-02-25T14:18:24Z",
};

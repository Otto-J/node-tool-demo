import { Service } from "@volcengine/openapi";
import * as dotenv from "dotenv";

const env = dotenv.config().parsed ?? {};

console.log("env", env);

const accessKeyId = env.VOLC_ACCESSKEY;
const secretKey = env.VOLC_SECRETKEY;

const postBody = {
  SourceLanguage: "en",
  TargetLanguage: "zh",
  TextList: ["hello world"],
};

const service = new Service({
  host: "open.volcengineapi.com",
  serviceName: "translate",
  region: "cn-north-1",
  accessKeyId,
  secretKey,
});

const fetchApi = service.createAPI("TranslateText", {
  Version: "2020-06-01",
  method: "POST",
  contentType: "json",
});

const rr = await fetchApi(postBody, {});

// [ { Translation: '你好世界', DetectedSourceLanguage: '', Extra: null } ]
console.log(rr.TranslationList);

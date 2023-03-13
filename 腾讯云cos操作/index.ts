import COS from "cos-nodejs-sdk-v5";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import { getAllFiles } from "./dist/util.js";

const env = dotenv.config().parsed ?? {};

const cos = new COS({
  SecretId: env.AK, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  SecretKey: env.SK,
});

// let files = [];

const _files = getAllFiles("./demo");

const files = _files.map((path) => ({
  Body: fs.createReadStream(path),
  Key: path.replace(/demo/, ""),
  FilePath: path,
  Bucket: env.BucketName, // 存储桶名称，格式：BucketName-APPID
  Region: env.Region, // 存储桶所在地域，如ap-guangzhou
}));

// console.log(files);

// 上传 dist 文件夹到存储桶
const uploadDir = async () => {
  cos.uploadFiles(
    {
      files: files,

      SliceSize: 1024 * 1024,
      onProgress(info) {
        const percent = Math.floor(info.percent * 10000) / 100;
        const speed = Math.floor((info.speed / 1024 / 1024) * 100) / 100;
        console.log("进度：" + percent + "%; 速度：" + speed + "Mb/s;");
      },
      onFileFinish(err, data) {
        console.log("on file finish", err, data?.statusCode);
      },
    },
    function (err, data) {
      console.log(err || data);
    }
  );
};

// uploadDir()

const listDepth1Dir = async () => {
  // 获取一级文件
  // cos.getBucket(
  //   {
  //     Bucket: env.BucketName,
  //     Region: env.Region,
  //     Delimiter: "/",
  //   },
  //   function (err, data) {
  //     if (err) {
  //       console.log("err", err);
  //     } else {
  //       console.log("data", data.Contents);
  //     }
  //   }
  // );
  // 获取一级目录
  cos.getBucket(
    {
      Bucket: env.BucketName,
      Region: env.Region,
      Prefix: "demo1",
      Delimiter: "/",
    },
    function (err, data) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("data", data.Contents);
      }
    }
  );
};

// listDepth1Dir();

// 备份线上的所有文件，放入 backup-日期文件夹中
const backUpOnlineDir = async () => {
  // 递归创建目录举例，可自行实现
  function mkDirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkDirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }
};

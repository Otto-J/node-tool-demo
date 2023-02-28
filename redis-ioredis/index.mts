import Redis from "ioredis";

const redis = new Redis({
  port: 6379,
  host: "localhost",
});
redis.on("error", (err) => {
  console.error("Redis error: " + err);
});

redis.on("connect", () => {
  console.log("Redis connected");

  try {
    // getFun();
    setFun();
  } catch (error) {
    console.log(error);
  }
});

// 存储值
// redis.set("key", "value", (err, res) => {
//   if (!err) {
//     console.log("Successfully set key to redis");
//   }
// });

// 读取值

const getFun = async () => {
  // const res = await redis.get("colors");
  // 获取 colors 的 set
  // const res = await redis.smembers("colors");
  // console.log("get key", res);
  // 获取 list 的 frunits
  // const res2 = await redis.lrange("frunits", 0, -1);
  // console.log("get key", res2);
  // 获取 hash 类型的 user
  // const res3 = await redis.hgetall("user");
  // console.log("get key", res3);
};

const setFun = async () => {
  // 设定 string name=otto 15秒后过期
  const res = await redis.set("name", "otto", "EX", 15);
  console.log(res);
};

// // 删除值
// redis.del("key", (err, res) => {
//   if (!err) {
//     console.log("Successfully delete key from redis");
//   }
// });

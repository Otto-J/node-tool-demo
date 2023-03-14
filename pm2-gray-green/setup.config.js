module.exports = {
  apps: [
    {
      name: "test",
      script: "./dist/index.js",
      instances: 2,
      exec_mode: "cluster",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,

      // env: {
      //   NODE_ENV: "development",
      // },
      // env_production: {
      //   NODE_ENV: "production",
      // },
    },
    {
      name: "test2",
      script: "./dist2/index.js",
      instances: 2,
      exec_mode: "cluster",
      error_file: "./logs2/err.log",
      out_file: "./logs2/out.log",
      log_file: "./logs2/combined.log",
      time: true,
    },
  ],
};

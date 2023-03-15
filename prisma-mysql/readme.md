# prisma 和 mysql

1. 先用 docker 启动一个 Mysql 容器
2. 根据文档，安装和创建 prisma 项目
3. 创建一个数据库，这个数据库好像还是得手动创建
4. 复制官网的 schema 到 `prisma/schema.prisma` 文件
5. 执行 migrate 操作。先交给 prisma

   不知道为啥会有个 generators 的操作，时间还挺长

   ```sh
   npx prisma migrate dev --name init
   # 这会自动生成一个 `migrations` 文件夹，和对应的 `init` 文件夹
   ```

6. done

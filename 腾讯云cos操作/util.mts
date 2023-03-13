import path from "node:path";
import fs from "node:fs";

// 获取指定路径下所有的文件的绝对路径
function getAllFiles(dir) {
  const results: string[] = [];

  // 递归遍历目录下的所有文件和子目录
  function traverse(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      // 如果是文件，加入到结果集中
      if (stat.isFile()) {
        results.push(filePath);
      }
      // 如果是目录，继续遍历
      else if (stat.isDirectory()) {
        traverse(filePath);
      }
    }
  }

  traverse(dir);

  return results;
}

// 测试用例
// const files = getAllFiles("./demo");
// console.log(files);
export { getAllFiles };

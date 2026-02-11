// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 静态导出时禁用图片优化
  },
};

module.exports = nextConfig;

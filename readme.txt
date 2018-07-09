首先在目录下使用npm install安装必要的依赖，并全局安装mocha
========================
npm install mocha -g
========================
之后在test.js中修改server_url后面的字符串为你的ip地址和端口号：
========================
[ip_addr]:[port]
========================
最后，使用mocha test.js执行测试
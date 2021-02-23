# project4_wx_mi
项目四：仿小米有品微信小程序项目练习
### 运行准备
1、准备微信开发者工具  
2、安装node服务    
3、安装mysql数据库和数据库管理软件（本人使用的是Navicat），并通过mini_mall.sql文件导入创建数据库   
4、修改wx-server -> config -> index.js配置文件中的数据库配置user和password  
5、本项目的服务器采用了yarn的打包方式，因此需要安装yarn  
yarn -v：             检查yarn是否存在    
npm install -g yarn： 通过安装node时捆绑安装的npm安装yarn包  
6、在wx-server根目录下打开命令提示窗口，输入yarn，安装第三方包  
7、打开控制命令窗口，输入ipconfig获取无线局域网适配器wlan的ipv4地址  
8、修改pages中的comm.wxs文件中module.exports.baseUrl="获取的ip:1314";  
9、修改utils中的https.js文件中的let baseUrl="获取的ip:1314";  
### 运行
1、在wx-server文件夹下打开命令窗口，输入yarn start启动项目服务器  
2、使用微信开发者工具打开项目

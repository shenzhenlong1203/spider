### spider
nodejs知乎头像抓取,利用fs文件组件，sync异步组件，request的http组件，进行批量的数据获取与写文件到本地

### 使用手册

#### 1. 拉取源代码

```shell
git clone git@github.com:shenzhenlong1203/zhihu-spider.git spider
```

#### 2. 初始化项目

```
npm install or yarn install
```

#### 3. 运行项目

```
cd spider/app && node user.js //获取用户数据

node start.js //进行下载数据
```

#### 4. 获取用户登陆态authorization
- 打开chorme，打开https://www.zhihu.com/，
- 登陆，首页随便找个用户，进入他的个人主页，F12(或鼠标右键，点检查)
- 点击关注，刷新页面，见图：
- ![2279594-0fa965cff3cddc64.jpeg](http://upload-images.jianshu.io/upload_images/2279594-0fa965cff3cddc64.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)


### 参考资料

- [https://www.tuicool.com/articles/BzQ7JnR](https://www.tuicool.com/articles/BzQ7JnR)

- [http://blog.csdn.net/liuyuehui110/article/details/68961006](http://blog.csdn.net/liuyuehui110/article/details/68961006)

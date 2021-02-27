## 豆瓣接口
#### 正在热映 
[https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=10&city=南昌&count=10](https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=10&city=南昌&count=10)  
#### 正在热映电影详情（基于上面的id）
[https://api.douban.com/v2/movie/subject/30362186(具体电影id)?apikey=0df993c66c0c636e29ecbb5344252a4a](https://api.douban.com/v2/movie/subject/30362186?apikey=0df993c66c0c636e29ecbb5344252a4a) 
#### 正在热映电影评论（基于上面的id）
[https://api.douban.com/v2/movie/subject/30362186(具体电影id)/comments?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=5](https://api.douban.com/v2/movie/subject/30362186/comments?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=5)   
## 头条
#### 列表  
[http://v.juhe.cn/toutiao/index?type=top&key=780d8e9820919d498c7de6a4684b2828](http://v.juhe.cn/toutiao/index?type=top&key=780d8e9820919d498c7de6a4684b2828)
## readme中制作图标
* https://img.shields.io/badge/<图标前部分的文字>-<图标后部分的文字>-<颜色>.svg?style=plastic|flat-square|social  
* https://img.shields.io/badge/GitHub-10k+-yellow.svg?style=social&logo=github
 
注意点：		
1、因为-是会用到的分割字符，如果文字中有-，如要用--来代替，如Objective-C要写成Objective--C
2、颜色可以是支持的英文，也可以是6位的16进制的字符串，如blue、0000ff
3、可以支持圆角、矩形样式、社交样式、还可以添加logo
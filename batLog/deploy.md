### 部署脚本 说明
#### 实现功能
1. 压缩备份当前tomcat webapps中的内容到指定文件夹
2. 解压war包并替换对应的配置文件
#### 配置说明
1. jarPath    _jar的绝对地址用于解压war包_     
``` 
  set jarPath=C:\Program Files\Java\jdk1.8.0_91\bin\jar.exe 
```
2. appName 		_项目包名称_	  
```
set appName=mispre.war 
```
3. 
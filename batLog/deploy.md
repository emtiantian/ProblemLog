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
3. rar _winRar 软件位置（在c盘搜索WinRAR)_
```
set rar=C:\Program Files (x86)\WinRAR\Rar.exe
```
4. webapps _tomcat webapps 文件夹位置_
```
set webapps=D:\public\tomcat\apache-tomcat-7.0.69\webapps
```
5.  新的war文件地址   
```
set newfile=C:\Users\0\Desktop\war\testRarReplace\mispre.war
```
6. 备份地址   
```
set backfile=D:\public\tomcat\backfile\
```
7. 需替换的配置文件的位置    
```
set replacePath=C:\Users\0\Desktop\war\config\*
```
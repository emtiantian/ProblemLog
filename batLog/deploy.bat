::部署脚本
::功能	1.复制当前服务器内容并压缩保存到指定目录
::		2.移动新的文件到指定地址
title deploy
:: jar 位置 
set jarPath=C:\Program Files\Java\jdk1.8.0_91\bin\jar.exe 
:: 项目名称
set appName=mispre.war 
:: rar 位置 在c盘搜索 WinRAR
set rar=C:\Program Files (x86)\WinRAR\
:: tomcat 所在磁盘d
set tomcatPan=D:
:: tomcat的bin文件夹
set tomcatBin=D:\public\tomcat\apache-tomcat-7.0.69\bin\
:: tomcat文件夹放置地址
set webapps=D:\public\tomcat\apache-tomcat-7.0.69\webapps
:: 新的war文件地址
set newfile=C:\Users\0\Desktop\war\testRarReplace\mispre.war
:: 备份地址
set backfile=D:\public\tomcat\backfile\
::需替换的配置文件的位置 
set replacePath=C:\Users\0\Desktop\war\config\*

::日期
set ymd=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%
::备份文件 完整目录
set backup-dir=%backfile%backup-%ymd% 
::备份目录
echo backup-dir：%backup-dir% 

echo -------------------------------- 

if not exist %backup-dir% ( 

mkdir %backup-dir% 

)
:: 停止tomcat
::call %tomcatBin%shutdown.bat
::复制到备份文件夹 
xcopy %webapps% %backup-dir% /i  /e 
::echo copy 
::pause
::压缩备份文件
cd %rar% 
Rar.exe  a -df  %backfile%backup-%ymd%.rar   %backup-dir% 
echo rar 
pause
::删除现有文件 不包括当前文件夹
rd /s /q %webapps%
::echo  remove tomcat  webapps
::pause 

rem::这个方法的问题在于 rar 不能解析war
rem::替换war中的配置文件 没有找到替换方法那么先删除然后添加进去就ok了~
::cd %rar% 
::Rar.exe a -ep -o+  C:\Users\0\Desktop\war\testRarReplace\mispre.war C:\Users\0\Desktop\war\testRarReplace\config\*

::使用jar 解压并且替换
::移动新的文件到指定tomcat 
xcopy  /q /s %newfile%  %webapps%\
del /s /q  %newfile%
::echo move to webapps
::pause
%tomcatPan% 
cd %webapps%
call "%jarPath%" -xvf %webapps%\%appName%
del /s /q %webapps%\%appName%
::echo unzip  %appName%
::pause 
xcopy /q /s   %replacePath%  %webapps%\mispre\
::echo replace config
::pause 
echo ok ~!  you can startup tomcat
pause 
::启动tomcat
::call %tomcatBin%startup.bat

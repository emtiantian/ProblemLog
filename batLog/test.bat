title test
:: jar 位置 
set jarPath=C:\Program Files\Java\jdk1.8.0_91\bin\jar.exe 
:: 项目名称
set appName=mispre.war 
:: rar 位置 在c盘搜索 WinRAR
set rar=C:\Program Files (x86)\WinRAR\Rar.exe
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
:: 解压war文件
::set jarPath=C:\Program Files\Java\jdk1.8.0_91\bin\jar.exe 
::cd C:\Users\0\Desktop\war\testRarReplace/
::call "%jarPath%" -xvf C:\Users\0\Desktop\war\testRarReplace\mispre.war 
::pause

:: 替换war中的配置
::xcopy /y /s   %replacePath%  %webapps%\WEB-INF\
::echo replace config
::pause 

:: 备份的时候出现好多层文件夹
call  "%rar% " a -df  %backfile%backup-%ymd%.rar   %backup-dir% 

echo see
pause
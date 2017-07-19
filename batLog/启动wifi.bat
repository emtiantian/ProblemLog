netsh wlan set hostednetwork mode=allow ssid=wowWifi key=12345678
@echo 创建完成
@echo off
pause
@echo 启动开始
netsh wlan start hostednetwork
@echo 启动完成
@echo off
pause
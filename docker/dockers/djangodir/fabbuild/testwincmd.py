# -*- coding: UTF-8 -*-
import subprocess
import os

# import psutil

cmd = "netstat -ano|findstr 8080"
# p = subprocess.Popen(cmd,stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
# p = subprocess.call(cmd)
#
# for line in p.stdout.readlines():
#     print(line)

# print(p)

s = os.popen(cmd)
str = s.readline()
index =str.find('LISTENING')
if  index> 0:
    pid = str[index+9 :].strip()
    print(pid)
print(str)
# 通过PID找到进程
print(os.popen("tasklist|findstr " + pid).read())

os.system("taskkill /pid "+pid+" -t -f")
os.environ['CATALINA_HOME'] = r'D:\softwares\apache-tomcat-8.5.24'
os.system(r"D:\softwares\apache-tomcat-8.5.24\bin\startup.bat")

print(os.popen(r"D:\softwares\apache-tomcat-8.5.24\bin\shutdown.bat").readline())


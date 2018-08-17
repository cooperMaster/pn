# -*- coding: UTF-8 -*-
import subprocess
import os

cmd = 'C:\\Users\\Administrator\\Desktop\\fab.bat'

# os.popen("cmd.exe /C " +cmd)
# subp =subprocess.Popen("cmd.exe /C " +cmd,shell=False)
# subp.communicate()

cmd = r'C:\Users\Administrator\Desktop\logs.rar'
cmd2 = r'C:\Users\Administrator\Desktop'
# subp =subprocess.Popen("cmd.exe /C ./UnRAR.exe e" +cmd,shell=False)
# subp.communicate()
subprocess.call("UnRAR.exe x " + cmd +" " +cmd2, shell=False)


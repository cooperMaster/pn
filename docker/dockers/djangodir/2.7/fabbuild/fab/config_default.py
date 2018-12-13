# -*- coding: UTF-8 -*-

__author__ = 'whoyiming'

configs = {
    'logpath' : [r"/usr/local/apps/jboss/standalone/log"],
    'uploaddir' : r'/usr/local/apps/war/prod',
    'fabcmd' : r'C:\Users\Administrator\Desktop\cmd\fab.bat',
    'unrarcmd' : r"C:\Users\Administrator\Desktop\cmd\UnRAR.exe",
    'unzipdir' : r"/usr/local/apps/war/unzipdir",
    'backupdir' : r"/usr/local/apps/war/backup",
    'nobackupdir':r"/usr/local/apps/war/nobackup",
    'packdir' : r"/usr/local/apps/war/pack",
    'javahome' : r"C:\Java\java8\jdk1.8.0_131",
    # 'prodplaces' : [r"D:\TOMCAT\apache-tomcat-7.0.81-x64\webapps\untitled"],
    # 'prodcmddir' : [r"D:\TOMCAT\apache-tomcat-7.0.81-x64"],
    'middleware' : [
        ['tomcat',{
            'prodplace': r"D:\TOMCAT\apache-tomcat-7.0.81-x64\webapps\untitled",
            'prodcmddir': r"D:\TOMCAT\apache-tomcat-7.0.81-x64"
        }],
        ['jboss',{
            'prodplace': r"/usr/local/apps/jboss/standalone/deployments/ACS",
            'prodcmddir' : r"/usr/local/apps/jboss",
            'startcmd' : 'service jboss start',
            'stopcmd' : 'service jboss stop'
        }],
        ['jboss_win',{
            'prodplace': r"C:\Users\Administrator\Desktop\jboss\jboss-eap-6.2\standalone\deployments\untitled",
            'prodcmddir' : r"C:\Users\Administrator\Desktop\jboss\jboss-eap-6.2",
            'startcmd' : '',
            'stopcmd' : ''
        }]
    ],
    'web' : [r"/usr/local/apps/war/aaaaaa/IMPS"],

}
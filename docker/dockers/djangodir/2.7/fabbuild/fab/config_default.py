# -*- coding: UTF-8 -*-

__author__ = 'whoyiming'

configs = {
    'logpath' : [r"/usr/local/apps/jboss/standalone/log"],
    'uploaddir' : r'E:\war\prod',
    'fabcmd' : r'C:\Users\Administrator\Desktop\cmd\fab.bat',
    'unrarcmd' : r"C:\Users\Administrator\Desktop\cmd\UnRAR.exe",
    'unzipdir' : r"E:\war\unzipdir",
    'backupdir' : r"E:\war\backup",
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

}
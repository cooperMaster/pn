# -*- coding: UTF-8 -*-

__author__ = 'whoyiming'

configs = {
    'logpath' : [r"E:\\war\\prod"],
    'uploaddir' : r'E:\\war\\prod',
    'fabcmd' : r'C:\\Users\\Administrator\\Desktop\\cmd\\fab.bat',
    'unrarcmd' : r"C:\\Users\\Administrator\\Desktop\\cmd\\UnRAR.exe",
    'unzipdir' : r"E:\\war\\unzipdir",
    'backupdir' : r"E:\\war\\backup",
    'nobackupdir':r"E:\\war\\nobackup",
    'packdir' : r"E:\\war\\pack",
    'javahome' : r"C:\\Java\\java6\\jdk1.6",
    # 'prodplaces' : [r"D:\\TOMCAT\\apache-tomcat-7.0.81-x64\\webapps\\untitled"],
    # 'prodcmddir' : [r"D:\\TOMCAT\\apache-tomcat-7.0.81-x64"],
    'middleware' : [
        ['tomcat',{
            'prodplace': r"D:\\TOMCAT\\apache-tomcat-7.0.81-x64\\webapps\\untitled",
            'prodcmddir': r"D:\\TOMCAT\\apache-tomcat-7.0.81-x64"
        }],
        ['jboss',{
            'prodplace': r"C:\\Users\\Administrator\\Desktop\\jboss\\jboss-eap-6.2\\standalone\\deployments\\untitled",
            'prodcmddir' : r"C:\\Users\\Administrator\\Desktop\\jboss\\jboss-eap-6.2"
        }]
    ],
    'web' : [r"C:\\Users\\Administrator\\Desktop\\aaaa\\IMPS"],

}
import subprocess, os, shutil
from . import config
import time
import platform

def getosplatform():
    sysstr = platform.system()
    if (sysstr == "Windows"):
        return "Windows"
    elif (sysstr == "Linux"):
        return "Linux"
    else:
        return "Other System tasks"

def processunzip(where,what):
    cmd = "UnRAR.exe x " + what + " " + where
    print('cmd:' + cmd)
    subprocess.call(cmd, shell=True)

def object2dict(obj):
    #convert object to a dict
    d = {}
    d['__class__'] = obj.__class__.__name__
    d['__module__'] = obj.__module__
    d.update(obj.__dict__)
    return d

def stopmiddleware(middlewarename,prodcmddir):
    # todo 如果中间名写错的处理
    osplatform = getosplatform()
    if osplatform == "Windows":
        suffix = "bat"
    elif osplatform == "Linux":
        suffix = "sh"
    else:
        suffix = "sh"

    if middlewarename.upper().find('TOMCAT') >= 0:
        stoptomcat(prodcmddir,suffix)
    elif middlewarename.upper().find('JBOSS') >= 0:
        stopjboss(prodcmddir,suffix)

def startmiddleware(middlewarename,prodcmddir):
    # todo 如果中间件名写错的处理
    osplatform = getosplatform()
    if osplatform == "Windows":
        suffix = "bat"
    elif osplatform == "Linux":
        suffix = "sh"
    else:
        suffix = "sh"

    if middlewarename.upper().find('TOMCAT') >= 0:
        starttomcat(prodcmddir,suffix)
    elif middlewarename.upper().find('JBOSS') >= 0:
        startjboss(prodcmddir,suffix)

def stoptomcat(prodcmddir,suffix):
    new_env = os.environ.copy()
    new_env['CATALINA_HOME'] = prodcmddir
    cmd = prodcmddir + os.path.sep +"bin" + os.path.sep + "shutdown." +suffix
    subprocess.Popen(cmd, env=new_env)
    print('停止tomcat')
    # subprocess.call(prodcmddir + os.path.sep +"bin" + os.path.sep + "shutdown.bat")

def starttomcat(prodcmddir,suffix):
    new_env = os.environ.copy()
    new_env['CATALINA_HOME'] = prodcmddir
    cmd = prodcmddir + os.path.sep +"bin" + os.path.sep + "startup." +suffix
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, env=new_env)
    while p.poll() is None:
        line = p.stdout.readline()
        line = line.strip()
        if line:
            print('Subprogram output: [{}]'.format(line))
    if p.returncode == 0:
        print('Subprogram starttomcat success')
    else:
        print('Subprogram starttomcat  failed')
    print('启动tomcat')
    # subprocess.call(prodcmddir + os.path.sep +"bin" + os.path.sep + "startup.bat")

def startjboss(prodcmddir,suffix):
    new_env = os.environ.copy()
    new_env['JAVA_HOME'] = config.configs.javahome
    cmd = prodcmddir + os.path.sep + "bin" + os.path.sep + "standalone." +suffix
    p = subprocess.Popen(cmd,stdout=subprocess.PIPE, stderr=subprocess.STDOUT, env=new_env)
    while p.poll() is None:
        line = p.stdout.readline()
        line = line.strip()
        if line:
            print('Subprogram output: [{}]'.format(line))
    if p.returncode == 0:
        print('Subprogram startjboss success')
    else:
        print('Subprogram startjboss  failed')
    print('启动jboss')

def stopjboss(prodcmddir,suffix):
    cmd = prodcmddir + os.path.sep + "bin" + os.path.sep + "jboss-cli."+suffix+" --connect command=:shutdown"
    subprocess.Popen(cmd)
    print('关闭jboss')

def mv(soce, dest):
    newdircount = []
    newfilecount = []
    ow = os.walk(soce)
    for top, dirs, nondirs in ow:
        # print("top:" +top)
        # print("dirs:" + str(dirs))
        # print("nondirs:" + str(nondirs))
        # dir = os.path.abspath(dest)
        # print("dir:"+ str(dir))
        # print(os.path.abspath(soce))
        # print(os.path.abspath(dest))

        # print(top.replace(os.path.abspath(soce), os.path.abspath(dest)))

        destdir = top.replace(os.path.abspath(soce), os.path.abspath(dest))
        for dir in dirs:
            print(destdir + os.path.sep + dir)
            if os.path.exists(destdir + os.path.sep + dir) is not True:
                print(destdir + os.path.sep + dir + "文件夹不存在，创建%s文件夹" % dir)
                os.makedirs(destdir + os.path.sep + dir)
                newdircount.append(destdir + os.path.sep + dir)
                print("文件夹%s创建成功" % dir)

        for nondir in nondirs:
            print("开始复制%s文件到%s" % (nondir, destdir))
            shutil.copy(top + os.path.sep + nondir, destdir)
            newfilecount.append(destdir + os.path.sep + nondir)
            print("复制%s文件到%s成功" % (nondir, destdir))

        print(newdircount)
        print(newfilecount)
    return newdircount,newfilecount

# mode--全量or增量 type--war包or ear包
# todo was的ear包全量发布是通过安装来发布
# war包的目录结构，例如：webapps文件夹下projectname.war projectname
def backup(prodPlace,mode=None,type='war'):
    timedir = time.strftime("%Y%m%d", time.localtime())
    timestr = time.strftime("%Y%m%d-%H%M%S", time.localtime())
    basename = os.path.basename(prodPlace)
    # 备份样式为 20180717/projectname-20180717-190008
    backupdir = config.configs.backupdir +  os.path.sep + timedir + os.path.sep + basename +"-"+ timestr
    if os.path.isdir(backupdir) is False:
        print("创建目录%s" % timedir)
        os.makedirs(backupdir)
    print("开始备份%s" % backupdir)
    if mode == 'full':
        # jboss 没有解压文件
        if os.path.isdir(prodPlace):
            t = shutil.move(prodPlace, backupdir)
        shutil.move(os.path.dirname(prodPlace) + os.path.sep + basename+"."+type,backupdir)
    else:
        #copytree指定的最外层目录必须不存在
        if os.path.isdir(prodPlace):
            t = shutil.copytree(prodPlace, backupdir + os.path.sep + basename)
        if os.path.isfile(os.path.dirname(prodPlace) + os.path.sep + basename + "." + type):
            shutil.move(os.path.dirname(prodPlace) + os.path.sep + basename + "." + type, backupdir)
    print("备份%s成功" % backupdir)


    return backupdir

def getProd(middlewarename):
    middleware = config.configs.middleware
    for mw in middleware:
        if mw[0] == middlewarename:
            prodPlace = mw[1].get('prodplace')
            prodcmddir = mw[1].get('prodcmddir')
            break

    return prodPlace,prodcmddir
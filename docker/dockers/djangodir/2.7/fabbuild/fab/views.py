# -*- coding: UTF-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, StreamingHttpResponse,  HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt,csrf_protect
#import chardet
from . import utils
from . import config
from . import process
import json
import os
import shutil
import subprocess
import time

# Create your views here.
def index(request):
    return HttpResponse("hello~")

def home(request):
    return render(request, "home.html")


def download(request):
    # file = request.body
    abspath = request.GET.get('abspath')
    filename = request.GET.get('filename')
    def file_iterator(file, chunk_size=5 * 1024):
        with open(file, 'rb') as f:
            while True:
                c = f.read(chunk_size)
                # encoding = chardet.detect(c)['encoding']
                # print(encoding)
                if c:
                    yield c
                else:
                    break

    response = StreamingHttpResponse(file_iterator(abspath))
    response['Content-Type'] = 'application/octet-stream; charset=utf-8'
    response['Content-Disposition'] = 'attachment;filename=' + filename

    return response

# 如果参数path为None则取上传文件夹下的值

def showfilecontents(request):
    uploaddir = config.configs.uploaddir
    path = request.GET.get('path')
    notFilter = request.GET.get('notFilter',None)
    if path:
        return render(request,'showfilecontents.html',{'filecontentlist' : utils.dirsTree(path,notFilter),'path':path})
    else:
        path = uploaddir
        filecontentlist = utils.dirsTree(path)
        return HttpResponse(json.dumps(filecontentlist, default=process.object2dict), content_type="application/json")

def showlogdirs(request):
    logpath = config.configs.logpath
    print logpath
    if len(logpath) == 0:
        return HttpResponse("想看日志，联系帅哥明")

    return render(request,'showdirs.html',{'paths' : logpath})

def showpackdirs(request):
    packdir = config.configs.packdir

    if len(packdir) == 0:
        return HttpResponse("想看压缩文件，联系帅哥明")

    return render(request,'showdirs.html',{'paths' : (packdir,)})

def upload(request):
    file = request.FILES['file']
    uploaddir = config.configs.uploaddir
    uploadfilename = uploaddir + os.path.sep + file.name
    print uploadfilename
    if os.path.isfile(uploadfilename):
        os.remove(uploadfilename)

    with open(uploadfilename, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    filecontentlist = utils.dirsTree(uploaddir)

    return HttpResponse(json.dumps(filecontentlist, default=process.object2dict), content_type="application/json")

# 发布 --调用命令行文件
# @csrf_exempt
# def fab(request):
#     fabcmd = config.configs.fabcmd
#     subprocess.call(fabcmd)
#     # "cmd.exe /C " 是指 fabcmd的执行文件放在C盘位置
#     # subp =subprocess.Popen("cmd.exe /C " + fabcmd,shell=False)
#     # subp.communicate()
#     return HttpResponse('fab success')


def fab(request):
    #todo type的赋值
    type = 'war'
    uploaddir = config.configs.uploaddir
    middlewareReq = request.POST.get('middleware')
    isbackup = request.POST.get('isbackup')
    prodPlace, prodcmddir,stopcmd,startcmd = process.getProd(middlewareReq)
    basename = os.path.basename(prodPlace)
    project = uploaddir + os.path.sep + basename + '.' + type
    if os.path.exists(project) is not True:
        return HttpResponse("请先上传项目%s包" % type)

    process.stopmiddleware(middlewareReq, prodcmddir,stopcmd)

    if isbackup == "yes":
        backup = config.configs.backupdir
    else:
        backup = config.configs.nobackupdir

    backupdir = process.backup(prodPlace, backup)


    if os.path.isdir(prodPlace):
        shutil.rmtree(prodPlace)

    # prodPlace的上层目录
    cdprodp = os.path.dirname(prodPlace)
    if middlewareReq.upper().find('JBOSS') >= 0:
        for ld in os.listdir(cdprodp):
            # 删除project.war.deployed 等这类东东
            if os.path.isfile(cdprodp + os.path.sep + ld) and len(ld.split(".")) > 2:
                os.remove(cdprodp + os.path.sep + ld)

    shutil.move(project ,cdprodp)
    process.startmiddleware(middlewareReq, prodcmddir,startcmd)

    return HttpResponse("success")

# 解压
def unzip(request):
    unrarcmd = config.configs.unrarcmd
    pathfile = request.POST.get('pathfile')
    where = config.configs.unzipdir
    what = pathfile
    # 先删除存在的
    if os.path.exists(where):
        shutil.rmtree(where)
    os.makedirs(where)
    if what.endswith('rar'):
        t = subprocess.call(unrarcmd +" x " + what + " " + where, shell=True)
    elif what.endswith('zip'):
        # python2.6 调用以下命令有报错，不知道解压完没，故使用linux的unzip命令
        # zf = zipfile.ZipFile(what,'r')
        # path = os.path.abspath(where+os.path.sep+os.path.basename(what).split(".")[0])
        # zf.extractall(path)
        os.system('unzip '+what +' -d ' + where+os.path.sep+os.path.basename(what).split(".")[0])
    # process.processunzip(where,what)
    return HttpResponse('unzip files success')

# 文件压缩及删除
def zip(request):
    startDate = time.strptime(request.POST.get('startDate'),"%Y-%m-%d")
    endDate = time.strptime(request.POST.get('endDate'),"%Y-%m-%d")
    path = request.POST.get('path')
    filecontentlist = utils.dirsTree(path)
    timedir = time.strftime("%Y%m%d-%H%M%S", time.localtime())
    dir = path + os.path.sep + timedir
    if os.path.isdir(dir) is False:
        os.makedirs(dir)

    files = []
    # path文件夹下的文件夹
    newdirs = []
    olddirs = []
    for fc in filecontentlist:
        fcs = fc.filecontents
        for file in fcs:
            filetime = time.strptime(file.filetime,"%Y-%m-%d %H:%M:%S")
            if filetime >= startDate and filetime < endDate:
                files.append(file.abspath)
                newdirs.append(os.path.dirname(file.abspath).replace(path, dir))
                olddirs.append(os.path.dirname(file.abspath))

    for nd in newdirs:
        if os.path.isdir(nd) is False:
            os.makedirs(nd)

    for f in files:
        shutil.move(f, f.replace(path, dir))

    # 压缩
    os.system("tar czvf "+ dir +".tar " +dir)
    shutil.rmtree(dir)
    # 还是不删了，别把path给删了
    # for od in olddirs:
    #     if path != od and os.path.isdir(od):
    #         shutil.rmtree(od)

    return HttpResponse('zip success')

def pack(request):
    packdir = config.configs.packdir
    path = request.POST.get('path')
    pathdir = request.POST.get('pathdir')
    if pathdir:
        pathfiles = path + os.path.sep + pathdir.replace("|",os.path.sep)
    else:
        pathfiles = path
    if os.path.isdir(pathfiles) is False:
        return HttpResponse(str(pathfiles) + "文件夹不存在")
    timedir = time.strftime("%Y%m%d-%H%M%S", time.localtime())
    dir = packdir + os.path.sep + timedir

    shutil.copytree(pathfiles,dir)

    os.system("tar czvf " + dir + ".tar " + dir)
    shutil.rmtree(dir)

    return HttpResponse("pack success")

def showunzipdir(request):
    unzipdir = config.configs.unzipdir

    return HttpResponseRedirect('showfilecontents?path=' + unzipdir)

def showprodplaces(request):
    middleware = config.configs.middleware
    paths = []
    notFilter = []
    for mw in middleware:
        paths.append(os.path.dirname(mw[1].get('prodplace')))
        notFilter.append(os.path.basename(mw[1].get('prodplace')))

    print paths
    if len(paths) == 0:
        return HttpResponse("想进行增量发布，联系帅哥明")

    return render(request, 'showdirs.html', {'paths': paths,'notFilter' : ','.join(notFilter)})


def partfab(request):
    fromPlace = request.POST.get('fromPlace')
    toPlace = request.POST.get('toPlace')
    # prodPlace = request.POST.get('prodPlace')
    middlewareReq = request.POST.get('middleware')
    backup = config.configs.backupdir
    unzipdir = config.configs.unzipdir
    if len(os.listdir(unzipdir)) == 0:
        return HttpResponse('没有解压文件，请先上传解压文件，再进行解压')

    if middlewareReq.upper().find('JBOSS') >= 0:
        return HttpResponse("JBOSS 只有全量发布")

    prodPlace, prodcmddir,stopcmd,startcmd = process.getProd(middlewareReq)

    process.stopmiddleware(middlewareReq, prodcmddir,stopcmd)
    backupdir = process.backup(prodPlace,backup)
    newdir, newfile = process.mv(fromPlace, toPlace)

    newaddfile = backupdir + os.path.sep +'addfile'

    with open(newaddfile,'w') as f:
        f.write("新增加文件夹:\n")
        for item in newdir:
            f.write("%s\n" % str(item))
        f.write("\n新增加文件:\n")
        for item in newfile:
            f.write("%s\n" % str(item))

    process.startmiddleware(middlewareReq, prodcmddir,startcmd)

    # 发完就删除解压包
    if os.path.exists(unzipdir):
        shutil.rmtree(unzipdir)
    os.makedirs(unzipdir)

    return HttpResponse("success")


def loadmiddlewarename(request):
    middleware = config.configs.middleware
    middlewarename = []
    for mw in middleware:
        middlewarename.append(mw[0])

    return HttpResponse(json.dumps(middlewarename), content_type="application/json")


def restartmiddleware(request):
    middlewareReq = request.POST.get('middleware')
    prodPlace, prodcmddir,stopcmd,startcmd = process.getProd(middlewareReq)

    process.stopmiddleware(middlewareReq, prodcmddir,stopcmd)

    # prodPlace的上层目录
    cdprodp = os.path.dirname(prodPlace)
    if middlewareReq.upper().find('JBOSS') >= 0:
        for ld in os.listdir(cdprodp):
            # 删除project.war.deployed 等这类东东
            if os.path.isfile(cdprodp + os.path.sep + ld) and len(ld.split(".")) > 2:
                os.remove(cdprodp + os.path.sep + ld)

    process.startmiddleware(middlewareReq, prodcmddir,startcmd)
    return HttpResponse("restart success")

def loadweb(request):
    web = config.configs.web
    webm = [os.path.basename(x) for x in web]

    return HttpResponse(json.dumps(webm), content_type="application/json")

def webfab(request):
    web = config.configs.web
    unzipdir = config.configs.unzipdir
    webmreq = request.POST.get('webm')
    mode = request.POST.get('mode')
    iswebbackup = request.POST.get('iswebbackup')

    if len(os.listdir(unzipdir)) == 0:
        return HttpResponse('没有解压文件，请先上传解压文件，再进行解压')

    for x in web:
        if x.endswith(webmreq):
            prodPlace = x

    if iswebbackup == 'yes':
        backup = config.configs.backupdir
    else:
        backup= config.configs.nobackupdir

    process.backup(prodPlace,backup,mode,'')
    if mode == 'part':
        fromWebPlace = request.POST.get('fromWebPlace')
        toWebPlace = request.POST.get('toWebPlace')
        process.mv(fromWebPlace, toWebPlace)
    else:
        process.mv(unzipdir,os.path.dirname(prodPlace))

    # 发完就删除解压包
    if os.path.exists(unzipdir):
        shutil.rmtree(unzipdir)
    os.makedirs(unzipdir)

    return HttpResponse('发布成功')

def showwebprodplaces(request):
    web = config.configs.web

    if len(web) == 0:
        return HttpResponse("想进行增量发布，联系帅哥明")

    return render(request, 'showdirs.html', {'paths': web})

def deletefile(request):
    file = request.POST.get('file')
    if os.path.isfile(file) is False:
       return HttpResponse("文件%s不存在" % file)

    os.remove(file)

    return HttpResponse("删除文件成功")
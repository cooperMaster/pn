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
        return render(request,'showfilecontents.html',{'filecontentlist' : utils.dirsTree(path,notFilter)})
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
    prodPlace, prodcmddir,stopcmd,startcmd = process.getProd(middlewareReq)
    basename = os.path.basename(prodPlace)
    project = uploaddir + os.path.sep + basename + '.' + type
    if os.path.exists(project) is not True:
        return HttpResponse("请先上传项目%s包" % type)

    process.stopmiddleware(middlewareReq, prodcmddir,stopcmd)

    backupdir = process.backup(prodPlace)
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
    t = subprocess.call(unrarcmd +" x " + what + " " + where, shell=True)
    # process.processunzip(where,what)
    return HttpResponse('unzip files success')

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
    if middlewareReq.upper().find('JBOSS') >= 0:
        return HttpResponse("JBOSS 只有全量发布")

    prodPlace, prodcmddir,stopcmd,startcmd = process.getProd(middlewareReq)

    process.stopmiddleware(middlewareReq, prodcmddir,stopcmd)
    backupdir = process.backup(prodPlace)
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
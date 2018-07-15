# -*- coding: UTF-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
#import chardet
from . import utils
from . import config

# Create your views here.
def index(requst):
    return HttpResponse("hello~")

def home(request):
    return render(request, "home.html")

@csrf_exempt
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

    response = FileResponse(file_iterator(abspath))
    response['Content-Type'] = 'application/octet-stream; charset=utf-8'
    response['Content-Disposition'] = 'attachment;filename=' + filename

    return response

def showfilecontents(request):
    path = request.GET.get('path')
    return render(request,'showfilecontents.html',{'filecontentlist' : utils.dirsTree(path)})

def showlogdirs(request):
    logpath = config.configs.logpath
    print(logpath)
    if len(logpath) == 0:
        return HttpResponse("想看日志，联系帅哥明")

    return render(request,'showdirs.html',{'logpath' : logpath})

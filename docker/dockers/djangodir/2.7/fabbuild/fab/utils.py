# -*- coding: UTF-8 -*-
import os
import time
from fab.Files import Files,Filecontent

def fileCntIn(currPath):
    '''汇总当前目录下文件数'''
    return sum([len(files) for root, dirs, files in os.walk(currPath)])

def dirsTree(startPath,notFilter=None):
    '''树形打印出目录结构'''
    dircontents = []
    # 只过滤掉startPath目录下的非notFilter文件夹 即startPath第一层目录中的非notFilter文件夹
    count = 0
    for root, dirs, files in os.walk(startPath):

        if notFilter  and count == 1:
            if notFilter != os.path.basename(root):
                continue

        count = count + 1
        #获取当前目录下文件数
        fileCount = fileCntIn(root)
        #获取当前目录相对输入目录的层级关系,整数类型
        level = root.replace(startPath, '').count(os.sep)

        indent = '|__' * 1 * level + ''
        filedir = '%s%s fileCount:%s' % (indent, os.path.split(root)[1], fileCount)
        print filedir
        fcs = []

        for filename in files:
            abspath = root + os.path.sep + filename
            filesize = os.path.getsize(abspath)
            filetime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(abspath)))


            if filesize > 1024 * 100:
                filesize = filesize / (1024 * 1024)
                showfilesname = ('%s|__%s  (mtime:%s | size:%.2f M)' % (indent, filename, filetime, filesize))
                print showfilesname
            else:
                filesize = filesize / 1024
                showfilesname = ('%s|__%s  (mtime:%s | size:%.2f K)' % (indent, filename, filetime, filesize))
                print showfilesname
            print "abspath: %s" % abspath

            fcs.append(Filecontent(filename, abspath, filetime, filesize, showfilesname))

        fcs.sort(key=lambda file : file.filetime, reverse=True)

        dircontents.append(Files(filedir, fcs ) )

    print dircontents
    return dircontents

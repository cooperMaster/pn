import os
import time

def fileCntIn(currPath):
    '''汇总当前目录下文件数'''
    return sum([len(files) for root, dirs, files in os.walk(currPath)])

def dirsTree(startPath):
    '''树形打印出目录结构'''
    for root, dirs, files in os.walk(startPath):
        #获取当前目录下文件数
        fileCount = fileCntIn(root)
        #获取当前目录相对输入目录的层级关系,整数类型
        level = root.replace(startPath, '').count(os.sep)
        #树形结构显示关键语句
        #根据目录的层级关系，重复显示'| '间隔符，
        #第一层 '| '
        #第二层 '| | '
        #第三层 '| | | '
        #依此类推...
        #在每一层结束时，合并输出 '|____'
        indent = '  ' * 1 * level + ''
        print('%s%s fileCount:%s' % (indent, os.path.split(root)[1], fileCount))
        for file in files:
            abspath = root + os.path.sep + file
            filesize = os.path.getsize(abspath)
            filetime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(abspath)))

            if filesize > 1024 * 100:
                filesize = filesize / (1024 * 1024)
                print('%s|__%s  (mtime:%s | size:%.2f M)' % (indent, file, filetime, filesize))
            else:
                filesize = filesize / 1024
                print('%s|__%s  (mtime:%s | size:%.2f K)' % (indent, file, filetime, filesize))
            # print("abspath: %s" % abspath)
        # print("sep--------------------------------:" + os.sep)
        # print("path-------------------------------:" + str(os.path.split(root)))

if __name__ == '__main__':
    path = u"C:\\Users\\37541\\Desktop\\TTT"
    dirsTree(path)

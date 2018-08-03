# -*- coding: UTF-8 -*-
class Files(object):
    def __init__(self, filedir, filecontents):
        self.filedir =filedir
        self.filecontents = filecontents

class Filecontent(object):
    def __init__(self, name, abspath, filetime, filesize, fileshowname):
        self.name = name
        self.abspath = abspath
        self.filetime = filetime
        self.filesize = filesize
        self.fileshowname = fileshowname
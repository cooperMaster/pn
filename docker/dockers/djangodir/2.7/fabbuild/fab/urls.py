from django.conf.urls import *
from . import views


urlpatterns = [
     url(r'^download', views.download, name="download"),
     url(r'^index', views.index, name="index"),
     url(r'^$', views.home, name="home"),
     url(r'^showfilecontents', views.showfilecontents, name="showfilecontents"),
     url(r'^showlogdirs/$', views.showlogdirs, name="showlogdirs"),
     url(r'^upload', views.upload, name="upload"),
     url(r'^fab', views.fab, name="fab"),
     url(r'^unzip', views.unzip, name="unzip"),
     url(r'^showunzipdir', views.showunzipdir, name="showunzipdir"),
     url(r'^showprodplaces', views.showprodplaces, name="showprodplaces"),
     url(r'^partfab', views.partfab, name="partfab"),
     url(r'^loadmiddlewarename', views.loadmiddlewarename, name="loadmiddlewarename"),
     url(r'^restartmiddleware', views.restartmiddleware, name="restartmiddleware"),
]

from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name="home"),
    path('download', views.download, name="download"),
    path('showfilecontents', views.showfilecontents, name="showfilecontents"),
    path('showlogdirs', views.showlogdirs, name="showlogdirs"),
    path('upload', views.upload, name="upload"),
    path('fab', views.fab, name="fab"),
    path('unzip', views.unzip, name="unzip"),
    path('showunzipdir', views.showunzipdir, name="showunzipdir"),
    path('showprodplaces', views.showprodplaces, name="showprodplaces"),
    path('partfab', views.partfab, name="partfab"),
    path('loadmiddlewarename', views.loadmiddlewarename, name="loadmiddlewarename"),
    path('restartmiddleware', views.restartmiddleware, name="restartmiddleware"),
    path('loadweb', views.loadweb, name="loadweb"),
    path('webfab', views.webfab, name="webfab"),
    path('showwebprodplaces', views.showwebprodplaces, name="showwebprodplaces"),
    path(r'zip', views.zip, name="zip"),
    path(r'pack', views.pack, name="pack"),
    path(r'showpackdirs', views.showpackdirs, name="showpackdirs"),
    path(r'deletefile', views.deletefile, name="deletefile"),
    path(r'showdirspace', views.showdirspace, name="showdirspace"),
]

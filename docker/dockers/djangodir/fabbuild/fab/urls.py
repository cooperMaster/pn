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
]

from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name="home"),
    path('download', views.download, name="download"),
    path('showfilecontents', views.showfilecontents, name="showfilecontents"),
    path('showlogdirs', views.showlogdirs, name="showlogdirs"),
]
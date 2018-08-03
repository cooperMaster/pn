from django.conf.urls import patterns, include, url

from django.contrib import admin
from fab import views

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'fabbuild.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^fab/', include('fab.urls')),
    url(r'^admin/', include(admin.site.urls)),
)

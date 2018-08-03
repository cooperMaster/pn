* 本项目基于django(下载时的版本为2.0.7)
* django的模板语法对于list中的并列的list迭代实现不好
```
形如 alist = [a,[b1,b2,b3],[c1,c2,c3]]
由于不能进行索引遍历，即不能取b1的同时取到c1
模板的index语法alist.0 alist.1
但好像通过参数来赋值index，无法实现
解决方案为 alist=[a,blist] blist.append([b1,c1]) blist.append([b2,c2])
```

* settings.py ALLOWED_HOSTS 会限制访问IP  ALLOWED_HOSTS=['*']代表all

```
prodcmddir = config.configs.prodcmddir[0]
new_env = os.environ.copy()
new_env['CATALINA_HOME'] = prodcmddir
cmd = prodcmddir + os.path.sep +"bin" + os.path.sep + "shutdown.bat"
subprocess.Popen(cmd, env=new_env)
subprocess添加环境变量
```
__author__ = 'admin'
# -*- encoding: ut8 -*-
# python3.5
from tkinter import *
from tkinter.messagebox import *
from tkinter.filedialog import *
import os

filename = ''

def author():
    showinfo('作者信息','admin')

def about():
    showinfo('软件信息','python tkinter编写的notebook')    

def openfile():
    global filename
    filename = askopenfilename(defaultextension = '.txt')
    if filename == '':
        filename = None
    else:
        root.title('FileName:' + os.path.basename(filename))
        textPad.delete(1.0,END)
        f = open(filename,'r')
        textPad.insert(1.0,f.read())
        f.close()

def newfile():
    global filename
    filename = None
    root.title('未命名文件')
    textPad.delete(1.0,END)

def save():
    global filename
    try:
        f = open(filename,'w')
        msg = textPad.get(1.0,END)
        f.write(msg)
        f.close
    except:
        saveas()

def saveas():
    f = askopenfilename(initialfile='new file',defaultextension = '.txt')    
    global filename
    filename = f
    fh = open(f,'w')
    msg =textPad.get(1.0,END)
    fh.write(msg)
    fh.close()
    root.tilte(os.path.basename(f))

def copy():
    textPad.event_generate('<<Copy>>')   
def cut():
    textPad.event_generate('<<Cut>>')
def paste():
    textPad.event_generate('<<Paste>>')        
def redo():
    textPad.event_generate('<<Redo>>')
def undo():
    textPad.event_generate('<<Undo>>')

def selectAll():
    textPad.tag_add('sel',1.0,END)   
    
def search():
    topsearch = Toplevel(root)
    topsearch.geometry('300x30+200+200')
    topsearch.title('查找')
    label1 = Label(topsearch,text='Find')
    label1.grid(row=0,column=0,padx=5)
    entry1 = Entry(topsearch,width=20)
    entry1.grid(row=0,column=1,padx=5)
    button1 = Button(topsearch,text='查找')
    button1.grid(row=0,column=2)

root = Tk()
root.title('note book edit')
root.geometry("800x500+100+100")

menubar = Menu(root)
root.config(menu = menubar)

filemenu = Menu(menubar)
filemenu.add_command(label='新建',accelerator='Ctrl + N',command = newfile)
filemenu.add_command(label='打开',accelerator='Ctrl + O' ,command = openfile)
filemenu.add_command(label='保存',accelerator='Ctrl + S',command = save)
filemenu.add_command(label='另存为',accelerator='Ctrl + + Shift + N',command=saveas)
menubar.add_cascade(label='文件',menu = filemenu)

editmenu = Menu(menubar)
editmenu.add_command(label='撤销',accelerator='Ctrl + Z',command=undo)
editmenu.add_command(label='重做',accelerator='Ctrl + Y',command=redo)
editmenu.add_separator()
editmenu.add_command(label='剪切',accelerator='Ctrl + X',command=cut)
editmenu.add_command(label='复制',accelerator='Ctrl + C',command=copy)
editmenu.add_command(label='粘贴',accelerator='Ctrl + V',command=paste)
editmenu.add_separator()
editmenu.add_command(label='查找',accelerator='Ctrl + F',command=search)
editmenu.add_command(label='全选',accelerator='Ctrl + A',command=selectAll)
menubar.add_cascade(label='编辑',menu = editmenu)

aboutmenu = Menu(menubar)
aboutmenu.add_command(label='作者',command = author)
aboutmenu.add_command(label='版权', command = about)
menubar.add_cascade(label='关于',menu = aboutmenu)

toolbar = Frame(root,height=25,bg='light sea green')
shortButton = Button(toolbar,text='打开',command = openfile)
shortButton.pack(side=LEFT,padx=5,pady=5)

shortButton = Button(toolbar,text='保存',command=save)
shortButton.pack(side=LEFT)
toolbar.pack(expand=NO,fill=X)

statusbar = Label(root,text='Ln20',bd=1,relief=SUNKEN,anchor=W)
statusbar.pack(side=BOTTOM,fill=X)

lnlabel = Label(root,width=2,bg='antique white')
lnlabel.pack(side=LEFT,fill=Y)

textPad = Text(root,undo=True)
textPad.pack(expand=YES,fill=BOTH)

scroll = Scrollbar(textPad)
textPad.config(yscrollcommand = scroll.set)
scroll.config(command = textPad.yview)
scroll.pack(side=RIGHT,fill=Y)

root.mainloop()
create database stu;

create table dept(
  deptno int auto_increment,
  deptname varchar(100),
  location varchar(200),
  primary key (deptno)
)DEFAULT CHARSET=utf8;
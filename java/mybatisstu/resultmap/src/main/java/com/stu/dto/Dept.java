package com.stu.dto;

public class Dept {
    private int deptNo;
    private String deptName;
    private String location;
    private int flag;
    private String flagStr;

    public Dept(){}

    public Dept(int flag){
        if (flag == 1) {
            this.flagStr = "true";
        }else{
            this.flagStr = "false";
        }
    }

    public int getDeptNo() {
        return deptNo;
    }

    public void setDeptNo(int deptNo) {
        this.deptNo = deptNo;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getLocation() {
        return location;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public String getFlagStr() {
        return flagStr;
    }

    public void setFlagStr(String flagStr) {
        this.flagStr = flagStr;
    }

    public void setLocation(String location) {
        this.location = location;

    }


}

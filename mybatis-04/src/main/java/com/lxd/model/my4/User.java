package com.lxd.model.my4;

import org.apache.ibatis.type.Alias;

/**
 * @ClassName User
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/4 11:00
 * @Version 1.0
 **/

@Alias("user")
public class User {
    private int id;
    private String usename;
    private int age;
    private Teacher teacherid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsename() {
        return usename;
    }

    public void setUsename(String usename) {
        this.usename = usename;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Teacher getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(Teacher teacherid) {
        this.teacherid = teacherid;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", usename='" + usename + '\'' +
                ", age=" + age +
                ", teacherid=" + teacherid +
                '}';
    }
}

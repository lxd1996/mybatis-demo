package com.lxd.model;

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

    public User() {
    }

    public User(int id, String name, int age) {
        this.id = id;
        this.usename = name;
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + usename + '\'' +
                ", age=" + age +
                '}';
    }
}

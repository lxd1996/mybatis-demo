package com.lxd.bean;

import org.apache.ibatis.type.Alias;

//mybatis注解，表示的是类的别名
@Alias("grade")
public class Grade {
    private int id;
    private String name;
    private String floor;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    @Override
    public String toString() {
        return "Grade{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", floor='" + floor + '\'' +
                '}';
    }
}

package com.lxd.pojo;

import lombok.Data;

import java.util.Date;
@Data
/**
 * @ClassName Role
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/10 15:13
 * @Version 1.0
 **/
public class Role {

    private Integer id;   //id
    private String roleCode; //角色编码
    private String roleName; //角色名称
    private Integer createdBy; //创建者
    private Date creationDate; //创建时间
    private Integer modifyBy; //更新者
    private Date modifyDate;//更新时间

}

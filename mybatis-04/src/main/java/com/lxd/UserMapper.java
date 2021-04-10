package com.lxd;

import com.lxd.model.my4.User;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @ClassName UserDao
 * @Description 用户持久层
 * @Author lxd
 * @Date 2021/4/4 10:59
 * @Version 1.0
 **/
public interface UserMapper {

    public List<User> getUerList();

    List<User> getUserTest();

    public List<User> getUerList2();

}

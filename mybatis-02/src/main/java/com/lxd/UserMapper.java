package com.lxd;

import com.lxd.model.User;

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

    public List<User> getUserList();

    public void insert(User user);

    public void delete(int id);

    public void update(int id);

    public void update2(Map<String,Object> map);

    public List<User> getUserBypage(Map map);

    public List<User> getUserRowBrands();

}

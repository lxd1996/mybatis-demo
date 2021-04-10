package com.lxd.dao;

import com.lxd.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @ClassName UserMapper
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/10 15:15
 * @Version 1.0
 **/
public interface UserMapper {
    /**
     * @param
     * @param map
     * @return
     * @throws Exception
     */
    //测试数据库是否链接成功
    List<User> getUser(Map<String,Integer> map) throws Exception;

    /**
     * 通过userCode获取User
     *
     * @param userCode
     * @return
     * @throws Exception
     */
    //通过userCode获取User
    public User getLoginUser(@Param("userCode") String userCode) throws Exception;

    /**
     * 增加用户信息
     * insert into
     * @param user
     * @return
     * @throws Exception
     */
    //增加用户信息
    public int add(User user) throws Exception;

    /**
     * 通过条件查询userList,limit分页
     *
     * @param userName
     * @param userRole
     * @return
     * @throws Exception
     */
    //通过条件查询userList,limit分页
    public List<User> getUserList(@Param("userName") String userName,
                                  @Param("userRole") Integer userRole,
                                  @Param("currentPageNO") Integer currentPageNO,
                                  @Param("pageSize") Integer pageSize)throws Exception;

    /**
     *通过条件查询-用户记录数
     * @param userName
     * @param userRole
     * @return
     * @throws Exception
     */
    //通过条件查询-用户记录数
    public int getUserCount(@Param("userName") String userName,
                            @Param("userRole") Integer userRole)throws Exception;

    /**
     * 通过userId删除user
     * delect from
     * @param id
     * @return
     */
    //通过userId删除user
    public int deleteUserById(@Param("id") Integer id);

    /**
     * 通过useId获取user
     * select from
     * @param id
     * @return
     */
    //通过useId获取user
    public User getUserById(@Param("id") Integer id);

    /**
     * 修改用户信息
     * update set
     * @param user
     * @return
     */
    //修改用户信息
    public int modify(User user);

    /**
     * update set
     * @param id
     * @param userPassword
     * @return
     */
    //修改当前用户密码
    public int updatePwd(@Param("id") Integer id, @Param("userPassword") String userPassword);
}

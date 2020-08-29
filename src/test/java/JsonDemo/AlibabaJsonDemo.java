package JsonDemo;

import com.alibaba.fastjson.*;
import com.lxd.bean.User;
/**
 * @ClassName AlibabaJsonDemo
 * @Description TODO
 * @Author lxd
 * @Date 2020/7/17 22:45
 * @Version 1.0
 **/
public class AlibabaJsonDemo {
    public static void main(String[] args) {
        User user  = new User();
        user.setAddress("陕西省");
        user.setAge(30);
        user.setId(1);
        user.setName("张三");
        user.setSex("男");

        String s = JSON.toJSONString(user);
        System.out.println(s);

    }

}

import com.lxd.UserMapper;
import com.lxd.model.my4.User;
import com.lxd.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

/**
 * @ClassName MyTest
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/9 7:08
 * @Version 1.0
 **/
public class MyTest {
    @Test
    public void test(){
        try {
            SqlSession sqlsession = MybatisUtils.getSqlsession();
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            List<User> uerList = mapper.getUerList();
            for (User user : uerList) {
                System.out.println(user.toString());
            }
            sqlsession.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test1(){
        try {
            SqlSession sqlsession = MybatisUtils.getSqlsession();
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            List<User> uerList = mapper.getUserTest();
            for (User user : uerList) {
                System.out.println(user.toString());
            }
            sqlsession.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3(){
        try {
            SqlSession sqlsession = MybatisUtils.getSqlsession();
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            List<User> uerList = mapper.getUerList2();
            for (User user : uerList) {
                System.out.println(user.toString());
            }
            sqlsession.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



}

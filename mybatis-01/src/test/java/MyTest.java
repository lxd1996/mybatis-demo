import com.lxd.UserMapper;
import com.lxd.model.User;
import com.lxd.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName MyYesy
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/4 11:22
 * @Version 1.0
 **/
public class MyTest {

    @Test
    public void test() throws IOException {

        try ( SqlSession sqlsession = MybatisUtils.getSqlsession()){
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);

            List<User> userList = mapper.getUserList();
            for (User user : userList) {
                System.out.println(user.toString());
            }
        }
    }

    @Test
    public void test1() throws IOException {
        try(SqlSession sqlsession = MybatisUtils.getSqlsession()){
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            mapper.insert(new User(2,"ssss",19));
            sqlsession.commit();
        }
    }

    @Test
    public void delte() throws IOException {
        try(SqlSession sqlsession = MybatisUtils.getSqlsession()){
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            mapper.delete(2);
            sqlsession.commit();
        }
    }

    @Test
    public void update2() throws IOException {
        try(SqlSession sqlsession = MybatisUtils.getSqlsession()){
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            Map<String,Object> map = new HashMap<>();
            map.put("username","刘旭东");
            map.put("userage",24);
            map.put("id",2);
            mapper.update2(map);
            sqlsession.commit();
        }
    }


}

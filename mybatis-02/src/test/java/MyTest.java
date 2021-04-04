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



}

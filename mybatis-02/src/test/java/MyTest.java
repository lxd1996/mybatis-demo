import com.lxd.UserMapper;
import com.lxd.model.User;
import com.lxd.utils.MybatisUtils;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
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

    public static Logger logger =  Logger.getLogger(MyTest.class);

    @Test
    public void test() throws IOException {

        try ( SqlSession sqlsession = MybatisUtils.getSqlsession()){
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);

            logger.error("this is a Error.......刘旭东.........................................");
            List<User> userList = mapper.getUserList();
            for (User user : userList) {
                System.out.println(user.toString());
            }
        }

    }

    @Test
    public void getUserBypoage(){
        try (SqlSession sqlsession = MybatisUtils.getSqlsession()){
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            Map map = new HashMap();
            map.put("startIndex",3);
            map.put("pageSize",2);
            List<User> userBypage = mapper.getUserBypage(map);
            for (User use: userBypage ) {
               logger.error(use.toString());
            }
        }catch (IOException e){
            logger.error(e);
        }

    }

    @Test
    public void getUserRowBronds(){
        try (SqlSession sqlsession = MybatisUtils.getSqlsession()){
            List<User> user = sqlsession.selectList("com.lxd.UserMapper.getUserRowBrands", null, new RowBounds(2, 3));
            for (User use: user ) {
                System.out.println(use.toString());
            }
        }catch (IOException e){
            logger.error(e);
        }

    }



}

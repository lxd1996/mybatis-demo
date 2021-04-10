import com.lxd.UserMapper;
import com.lxd.model.User;
import com.lxd.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.junit.Test;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;


/**
 * @ClassName MyTest
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/6 0:28
 * @Version 1.0
 **/
public class MyTest {

    public static Logger logger = Logger.getLogger(MyTest.class);

    @Test
    public void test() {
        //也可通过注解实现，注解通过反射去动态获取对象，
        try (SqlSession sqlsession = MybatisUtils.getSqlsession()) {
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            List<User> userList = mapper.getUserList();
            for (User user : userList) {
                System.out.println(user.toString());
            }
        } catch (IOException e) {
            logger.error("Error" + e);
        }

    }

    @Test
    public void test2(){
        //也可通过注解实现，注解通过反射去动态获取对象，
        try (SqlSession sqlsession = MybatisUtils.getSqlsession()) {
            UserMapper mapper = sqlsession.getMapper(UserMapper.class);
            mapper.delete(2);

        } catch (IOException e) {
            logger.error("Error" + e);
        }
    }

    @Test
    public void test3() throws Exception{
        //原生的jdbc
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://127.0.0.1:3306/test?serverTimezone=GMT";
        String user = "root";
        String pwd  = "root";
        Connection connection = DriverManager.getConnection(url, user, pwd);
        String sql = "select * from user where id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1,1);
        System.out.println(preparedStatement.toString());
        ResultSet resultSet = preparedStatement.executeQuery();
        while(resultSet.next()){
            System.out.println(resultSet.getString("name"));
        }

    }
}

import com.lxd.bean.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Before;
import org.junit.Test;
import java.io.InputStream;

public class test {
    private SqlSessionFactory sqlSessionFactory = null;
    @Before
    public void init (){
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();

        try {
            InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
            this.sqlSessionFactory = sqlSessionFactoryBuilder.build(inputStream);
        }catch(Exception e){
            System.out.println("异常了"+e);
        }

    }
    @Test
    public void testQueryUserById(){
        // 4. 创建SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        // 5. 执行SqlSession对象执行查询，获取结果User
        // 第一个参数是UserMapper.xml的statement的id，第二个参数是执行sql需要的参数；
        User user=sqlSession.selectOne("queryUserById",2);
        //ArrayList a = (ArrayList) sqlSession.selectList("queryUserById");
        // 6. 打印结果
        //System.out.println(user);
        // 7. 释放资源
        System.out.println(user);
        sqlSession.close();
        }
}

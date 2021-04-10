package com.lxd.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;


/**
 * @ClassName MybatisUtil
 * @Description 获取mysql的sqlSession
 * @Author lxd
 * @Date 2021/4/10 15:24
 * @Version 1.0
 **/
public class MybatisUtil {

    //TODO 可以优化下获取的方式
    public static SqlSession getSqlSession() {
        SqlSessionFactory build = null;
        try(Reader resources = Resources.getResourceAsReader("mybatis-config.xml")) {
            SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
            build = sqlSessionFactoryBuilder.build(resources);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

        }
        return build.openSession(true);
    }

}

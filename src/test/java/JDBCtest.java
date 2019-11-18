import org.junit.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class JDBCtest {
    @Test
    public void JDBCtest (){//手动创建的mysql连接
            Connection conn = null;
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                Class.forName("com.mysql.cj.jdbc.Driver");//获取驱动文件
                String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&serverTimezone=GMT&useSSL=false";//连接的时候和配置文件不同
                String name = "root";
                String password = "root";
                 conn = DriverManager.getConnection(url, name, password);
                 preparedStatement = conn.prepareStatement("select * from user where id = ?");
                preparedStatement.setInt(1, 2);//参数（第一个？的位置，第二个参数是传入的值）
                 resultSet = preparedStatement.executeQuery();
                //System.out.println(resultSet);

                while (resultSet.next()){
                    System.out.println(resultSet.getInt("id"));
                    System.out.println(resultSet.getString("name"));
                    System.out.println(resultSet.getString("loginname"));
                }
                //System.out.println("连接成功了");
            }catch (Exception e){
                System.out.println(e);
            }finally {
                //if(preparedStatement  != null)
                //preparedStatement.close();
            }


    }
}

package I18n;

import java.io.FileInputStream;
import java.util.Locale;
import java.util.Properties;
import java.util.ResourceBundle;

public class NewHelloWorld {
    public static void main(String[] args) {
        Properties props = null;
        try {
            Locale local = Locale.getDefault();
            System.out.println(local);

            //properties资源文件的放置路径在       file:/E:/mybatisSecond/target/test-classes/
            //Why??????????????????????????????????????  涉及到classpath  相对路径，绝对路径等问题
            //https://www.iteye.com/blog/wjlvivid-1914599
            {
                props = new Properties();
                props.load(new FileInputStream("E:/mybatisSecond/src/main/resources/message_zh_CN.properties"));//在工程底下src 目录的conf目录下
                System.out.println(System.getProperty("user.dir"));  //这个是去工程的绝对路径的
                System.out.println(Thread.currentThread().getContextClassLoader().getResource(""));
                //这个是去当前classpath的uri的!
                //new Properties().load(new FileInputStream("test.properties"));//这里说明test文件在工程的跟目录下!
                //new Properties().load(new FileInputStream("test/test.properties"));//说明,在工程底下的test的文件夹底下的文件test.properties!
            }

            //http://blog.sina.com.cn/s/blog_8f329b7b0101hcs3.html
//            {
//                System.out.println(System.getProperty("user.dir")); //这个是去工程的绝对路径的
//                System.out.println(Thread.currentThread().getContextClassLoader().getResource(""));//这个是去当前classpath的uri的!
//                new Properties().load(new FileInputStream("test.properties"));//这里说明test文件在工程的跟目录下!
//                new Properties().load(new FileInputStream("test/test.properties"));//说明,在工程底下的test的文件夹底下的文件test.properties!
//                ResourceBundle rs = ResourceBundle.getBundle("org.hello");//这里说明,hello文件就是在于classpath底下的,org包底下有这个文件hello.properties~也就是说.../bin/这个是classpath绝对路径!
//                props = new Properties();
//                props.load(new FileInputStream("src/conf/msf.properties"));//在工程底下src 目录的conf目录下
//            }
            //根据本地语言更换对应的properties//问题是资源包放哪里呢
            ResourceBundle message = ResourceBundle.getBundle("message", local);

            System.out.println(message.getString("hello"));

            local = new Locale("en", "US");

            message = ResourceBundle.getBundle("message", local);
            System.out.println(message.getString("hello"));
        }catch (Exception e){
            e.printStackTrace();
        }


    }
}

package HRPLicense;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

/**
 * @ClassName ReadBook
 * @Description TODO
 * @Author lxd
 * @Date 2020/4/7 16:51
 * @Version 1.0
 **/
public class ReadBook {
    public static final int LINELENGTH=60;//自定义行的长度
    public static void main(String[] args) {
        File file = new File("C:\\Users\\lxd\\Desktop\\1234.txt");
        try {
            BufferedReader in = new BufferedReader(new FileReader(file));
            String str;
            int i = 1;
            while ((str = in.readLine()) != null) {
                if (str.isEmpty()) continue;
                if ( i <= 10) {//控制台一次打印不了全部内容，后面的会把前面的覆盖
                    while (str.length() > LINELENGTH) {//将长的行自动换行
                        System.out.println(i + "\t" + str.substring(0, LINELENGTH));
                        str = str.substring(LINELENGTH);
                    }
                    System.out.println(i + "\t" + str);//记录当前第几行，便于下次阅读
                }
                i++;
            }
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

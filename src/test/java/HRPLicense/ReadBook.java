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
    public static final int LINELENGTH=60;//�Զ����еĳ���
    public static void main(String[] args) {
        File file = new File("C:\\Users\\lxd\\Desktop\\1234.txt");
        try {
            BufferedReader in = new BufferedReader(new FileReader(file));
            String str;
            int i = 1;
            while ((str = in.readLine()) != null) {
                if (str.isEmpty()) continue;
                if ( i <= 10) {//����̨һ�δ�ӡ����ȫ�����ݣ�����Ļ��ǰ��ĸ���
                    while (str.length() > LINELENGTH) {//���������Զ�����
                        System.out.println(i + "\t" + str.substring(0, LINELENGTH));
                        str = str.substring(LINELENGTH);
                    }
                    System.out.println(i + "\t" + str);//��¼��ǰ�ڼ��У������´��Ķ�
                }
                i++;
            }
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package JavaIoPacket.IoDemoByMyself;

import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.Buffer;

/**
 * @ClassName TxtFileRead
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/22 16:05
 * @Version 1.0
 **/
public class TxtFileRead {
    public static void main(String[] args) {
        readFile();
    }
    public static void readFile(){
        FileInputStream fis = null;
        InputStreamReader isr = null;
        BufferedReader br = null;
        try{
            //fis = new FileInputStream("d:\\tempp\\abcd.txt");
            fis = new FileInputStream("d:"+File.separator+"tempp"+File.separator+"abcd.txt");
            isr = new InputStreamReader(fis,"Utf-8"); //这是读取，所以要将子节转化为字符类
            br = new BufferedReader(isr);
            String str;
            while ((str = br.readLine()) != null) {
                //String s = ;
                System.out.println(str);
            }
            fis.close();
        }catch (Exception e){
            e.getMessage();
        }
    }
}

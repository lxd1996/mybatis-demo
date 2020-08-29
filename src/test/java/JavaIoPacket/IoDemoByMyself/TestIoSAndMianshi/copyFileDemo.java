package JavaIoPacket.IoDemoByMyself.TestIoSAndMianshi;

import java.io.*;
import java.nio.Buffer;

/**
 * @ClassName copyFileDemo
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/23 11:50
 * @Version 1.0
 **/
public class copyFileDemo {
    public static void main(String[] args) {
        //赋值文件从d:tempp到D:tempp1
        copyFile("D:\\tempp\\copyDemo.txt","D:\\tempp1\\copyDemoTo.txt");

    }
    public static void copyFile(String from,String to){
        File fromFile  = new File(from);
        File toFile = new File(to);

        try {

            FileInputStream fis = new FileInputStream(fromFile);
            //BufferedInputStream bis = new BufferedInputStream(fis);
            InputStreamReader sir = new InputStreamReader(fis,"UTF-8");
            BufferedReader bis = new BufferedReader(sir);

            FileOutputStream fos = new FileOutputStream(toFile);
            //BufferedOutputStream bos = new BufferedOutputStream(fos);
            OutputStreamWriter osw = new OutputStreamWriter(fos,"UTF-8");
            BufferedWriter bos = new BufferedWriter(osw);

//            while(bis.read() != -1){
//                bos.write(bis.read());
//            }
            String str ;
            while((str = bis.readLine()) != null){
                bos.write(str);
                bos.newLine();
            }


            bos.flush();
            bis.close();
            bos.close();
        }catch (Exception e){

        }

    }
}

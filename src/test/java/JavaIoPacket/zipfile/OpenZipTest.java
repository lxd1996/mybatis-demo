package JavaIoPacket.zipfile;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class OpenZipTest {
    public static void main(String[] args) {
        OpenZip();//单个解压缩
        //TO DO
        //OpenZipall();//多个文件解压缩

    }

    public static void OpenZip(){
        File file = new File("E:\\Io_Test\\Programs.zip");//定义解压文件

        ZipInputStream zipinput = null;//定义压缩输入流

        try {
            zipinput = new ZipInputStream(new FileInputStream(file));//实例化ZipInputStream
            ZipEntry zipentry = zipinput.getNextEntry();//得到一个压缩体
            System.out.println("压缩的实体文件名称"+zipentry.getName());//获取压缩包中 文件名字

            //新建目标文件，需要从目标文件打开输出流，数据中java中流入
            File outfile = new File("E:\\Io_Test\\"+zipentry.getName());
            System.out.println(outfile);
            OutputStream out = new FileOutputStream(outfile);//实例化文件输出流
            int temp = 0;
            while((zipinput.read()) != -1){
                out.write(temp);
            }
            zipinput.close();
            out.close();
            System.out.println("zip is done.");

        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}

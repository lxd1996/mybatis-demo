package JavaIoPacket;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

//zip类是id的子类，但是到了util底下
public class ZipTest {
    public static void main(String[] args) {
        //ziptest();
        ziptestall();
    }
    //单个文件
    public static void ziptest(){
        File file = new File("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\FIleOutWriteTest.txt");//定义要压缩的文件
        File filezip = new File("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\FIleOutWriteTest.zip");//定义压缩文件的名字

        try {
            InputStream input = new FileInputStream(file);//定义文件的输入流
            ZipOutputStream zipout = null;//声明压缩流对象
            zipout = new ZipOutputStream(new FileOutputStream(filezip));
            zipout.putNextEntry(new ZipEntry(file.getName()));//设置ZipEntry对象
            zipout.setComment("sing file zip");//设置注释

            //压缩过程
            int temp = 0;
            while((temp = input.read()) != -1){
                zipout.write(temp);
            }
            input.close();
            zipout.close();

            System.out.println("Done.");


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
    public static void ziptestall(){
        File file = new File("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\zipfile");//定义要压缩的文件夹
        File filezip = new File("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\zipfile.zip");//定义压缩文件的名字

        try {
            InputStream input = null;//new FileInputStream(file);//定义文件的输入流
            ZipOutputStream zipout = null;//声明压缩流对象
            zipout = new ZipOutputStream(new FileOutputStream(filezip));
            //zipout.putNextEntry(new ZipEntry(file.getName()));//设置ZipEntry对象
            zipout.setComment("sing file zip");//设置注释

            //压缩过程
            int temp = 0;
            if(file.isDirectory()){
                File[] filelist = file.listFiles();//列出所有文件
                for (File files: filelist
                     ) {
                    input = new FileInputStream(files);//定义文件的输入流
                    zipout.putNextEntry(new ZipEntry(file.getName()+File.separator+files.getName()));
                    System.out.println("正在压缩"+files.getName());
                    while((temp = input.read()) != -1){
                        zipout.write(temp);
                    }
                }
                input.close();
            }
            zipout.close();
            System.out.println("Done.");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

}
    }


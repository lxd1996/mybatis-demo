package JavaIoPacket;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class ReadTxt {
    public static void main(String[] args) {
        readtxt();
        //readtxt1();

    }
    public static void readtxt(){
        FileInputStream in = null;
        InputStreamReader isr = null;
        BufferedReader br = null;
        try{
            in = new FileInputStream("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\FIleOutWriteTest.txt");//节点类，负责读字节
            isr = new InputStreamReader(in,"UTF-8");//转化类，转化为字符
            br = new BufferedReader(isr);//缓冲类
            String s ;//一行一行读
            while(( s = br.readLine()) != null){
                System.out.println(s);
            }
            br.close();
        }catch (IOException e){ e.printStackTrace();}finally {

        }
    }
    public static void readtxt1(){
        try(BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\FIleOutWriteTest.txt")))){
            String s ;
            while ((s = br.readLine()) != null){
                System.out.println(s);
            }

        }catch (IOException e){e.printStackTrace();}
    }
}

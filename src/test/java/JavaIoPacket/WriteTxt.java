package JavaIoPacket;

import java.io.*;

public class WriteTxt {
    public static void main(String[] args) {
        writeFile();
        writeFilenew();

    }

    public static void writeFile(){
        FileOutputStream fos = null;//节点类,负责写字节-----小
        OutputStreamWriter osw = null;//转化类，负责字节到字符的转化-------大
        BufferedWriter bw = null;//装饰类，负责写到缓冲区
        //三者关系
        //BufferedWriter(OutputStreamWrite(FileOutputStream("File")))
        try {
            fos = new FileOutputStream("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\FIleOutWriteTest.txt");
            osw = new OutputStreamWriter(fos,"UTF-8");
            bw = new BufferedWriter(osw);
            bw.write("我们是");
            bw.newLine();
            bw.write("学生！！");
            bw.close();

        }catch (IOException e){
            e.printStackTrace();
        }finally {
            System.out.println("关闭流");
        }
    }
    //jdk1.7之后才能用的 使用了try-resource结构，自动会帮助关闭流
    public static void writeFilenew(){
        try(BufferedWriter bf = new BufferedWriter(new OutputStreamWriter( new FileOutputStream("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\FIleOutWriteTest.txt"))))
        {
            bf.write("我是猪");
            bf.newLine();
            bf.write("你懂吗，哈哈");
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}

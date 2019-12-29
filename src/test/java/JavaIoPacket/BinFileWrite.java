package JavaIoPacket;

import java.io.*;

public class BinFileWrite {
    public static void main(String[] args) {
        binFileWrite();
    }
    public static void binFileWrite(){
        FileOutputStream fos = null;//节点类，负责写字节
        BufferedOutputStream bos = null;//装饰类，写字节到缓冲区缓冲区
        DataOutputStream dos = null;//转化,负责数据类型到字节的转化


        try {
            fos = new FileOutputStream("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\dat.dll");
            bos = new BufferedOutputStream(fos);
            dos = new DataOutputStream(bos);

            dos.write(123);
            dos.writeUTF("a");
            dos.writeByte('b');
            dos.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {

        }

    }
}

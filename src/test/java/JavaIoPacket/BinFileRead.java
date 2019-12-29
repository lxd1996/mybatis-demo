package JavaIoPacket;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.FileInputStream;

public class BinFileRead {
    public static void main(String[] args) {
        binFileRead();
        binFileRead1();//jdk1.7以上能用，try-resource方式
    }
    public static void binFileRead(){
        FileInputStream fis = null;//
        BufferedInputStream bis = null;
        DataInputStream dis = null;

        try {
            fis = new FileInputStream("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\dat.dll");
            bis = new BufferedInputStream(fis);
            dis = new DataInputStream(bis);

            byte b = dis.readByte();
            String s = dis.readUTF();
            byte read = dis.readByte();
            //boolean b1 = dis.readBoolean();

            System.out.println(b+s+read);
            dis.close();


        }catch (Exception e){
            e.printStackTrace();
        }
    }
    public static void binFileRead1(){
        try(DataInputStream dis = new DataInputStream(new BufferedInputStream(new FileInputStream("E:\\mybatisSecond\\src\\test\\java\\JavaIoPacket\\dat.dll")))){
            byte b = dis.readByte();
            String s = dis.readUTF();
            byte read = dis.readByte();
            //boolean b1 = dis.readBoolean();

            System.out.println(b+s+read);

        }catch (Exception e){e.printStackTrace();}
    }
}


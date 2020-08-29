package JavaIoPacket.IoDemoByMyself;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.FileInputStream;

/**
 * @ClassName BinFileRead
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/23 11:38
 * @Version 1.0
 **/
public class BinFileRead {
    public static void main(String[] args) {
        fileRead();

    }
    public static void fileRead(){
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        DataInputStream dis = null;

        try {
            fis = new FileInputStream("d:\\tempp1\\abcd.dll");
            bis = new BufferedInputStream(fis);
            dis = new DataInputStream(bis);
            String s1 = dis.readUTF();
            System.out.println("wwwwww"+s1);
            int i = dis.readInt();
            System.out.println("gggggg"+i);
            String s = dis.readUTF();
            System.out.println("hhhhhhhhhhhhhh"+s);
            int m = dis.readInt();
            System.out.println("jjjjjjj"+m);
            dis.close();

        }catch (Exception e){

        }
    }
}

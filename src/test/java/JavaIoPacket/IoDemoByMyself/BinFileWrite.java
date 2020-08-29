package JavaIoPacket.IoDemoByMyself;

import java.io.BufferedOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Properties;

/**
 * @ClassName BinFileWrite
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/22 16:20
 * @Version 1.0
 **/
public class BinFileWrite {
    public static void main(String[] args) throws Exception{
        writeFile();


    }
    public static void writeFile() throws Exception{
       // 写二进制文件步骤 不外乎以下操作形式
        //1.首先你得需要个地方来放这个东西吧
        //2.数据多你需要缓存吧，（区别于文本文件的读写，这个不需要转换了，开心吧，因为本身就是二进制字节）
        //3.新增加一个 数据类型到字节的转化  （文件为二进制文件，你写的是文本文件，到具体的文件存的是二进制，肯定要进行转化呀）

        File file = new File("d:"+File.separator+"tempp1");

        if(!file.exists()){
            file.mkdir();
        }
        File file1 = new File("d:"+File.separator+"tempp1"+File.separator+"abcd.dll");
        if(!file1.exists()){
            file1.createNewFile();
        }


        FileOutputStream fos = null;
        BufferedOutputStream bos = null;
        DataOutputStream dos = null;

        try{
            fos = new FileOutputStream(file1);
            bos = new BufferedOutputStream(fos);
            dos = new DataOutputStream(bos);
            dos.writeInt(3);
            dos.writeUTF("eee");
            dos.writeInt(55);
            dos.flush();
            dos.close();

        }catch (Exception r){

        }




    }
}

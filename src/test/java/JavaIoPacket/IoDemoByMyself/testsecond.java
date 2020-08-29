package JavaIoPacket.IoDemoByMyself;

import JavaIoPacket.ReadTxt;
import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;
import sun.plugin2.gluegen.runtime.BufferFactory;
import sun.util.BuddhistCalendar;

import java.io.*;

/**
 * @ClassName testsecond
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/24 15:18
 * @Version 1.0
 **/
public class testsecond {
    public static void main(String[] args) throws IOException {
        //writeFileBytxt();
        readFileBytxt();

    }
    public static void readFileBytxt() throws  IOException{

        //Reader rd = new InputStreamReader("d:\tempp\test.txt");
//        Reader rd = new FileReader("d:\\tempp\\test.txt");
//        BufferedReader br = new BufferedReader(rd);
        FileInputStream fis = new FileInputStream("d:\\tempp\\test.txt");
        InputStreamReader sr = new InputStreamReader(fis);
        BufferedReader br = new BufferedReader(sr);
        String str;
        while((str = br.readLine())!= null){
            System.out.println(str);
        }




    }

    public static void writeFileBytxt() throws IOException {
        File file = new File("d:\tempp");
        if(file.exists()){
            file.mkdir();
        }
        File filetxt = new File("d:\\tempp\\test.txt");
        filetxt.createNewFile();

        FileOutputStream fos = new FileOutputStream(filetxt);

        OutputStreamWriter os = new OutputStreamWriter(fos);

        BufferedWriter bf = new BufferedWriter(os);
//
//        os.write("ertyhfgdsds");
//        os.write("\\n");
//        os.write("你说什么呢");
//        os.close();
        bf.write("傻子吧你是");
        bf.newLine();
        bf.write("测试这是什么玩意");
        bf.close();

    }
}

package JavaIoPacket.IoDemoByMyself;

import java.io.File;
import java.io.IOException;

/**
 * @ClassName FileDemo
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/22 14:20
 * @Version 1.0
 **/
public class FileDemo {
    public static void main(String[] args) {
        File file = new File("c:/Down");
        if(!file.exists()){
            file.mkdir();
        }
        File f = new File("c:/Down/abc.txt");

        if(!f.exists()){
            try {
                f.createNewFile();
            }catch(IOException e){
                e.printStackTrace();
            }
        }
        //输出相关属性
        System.out.println("Is is file? "+f.isFile()); //判断是否是文件
        System.out.println("Is is Director？ "+f.isDirectory());//判断是否是目录
        System.out.println("Name:"+f.getName());
        System.out.println("Parent:"+f.getParent());
        System.out.println("Path："+f.getPath());
        System.out.println("Size："+f.length()+"Byte");
        System.out.println("Last modified ："+f.lastModified()+"ms");

        System.out.println("便利文件");

        File[] files = file.listFiles();

        for (File fis: files
             ) {
            System.out.println(fis.getPath());
        }


    }
}

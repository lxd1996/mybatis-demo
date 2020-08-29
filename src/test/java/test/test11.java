package test;


import java.io.File;
import java.io.IOException;

/**
 * @ClassName test11
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/16 22:35
 * @Version 1.0
 **/
public class test11 {
    public static void main(String[] args) throws IOException {
        //以当前的路劲下创建一个File对象
        File file = new File(".");
        //获取文件命名
        System.out.println(file.getName());
        //获取相对路径下面的父路劲,出错
        System.out.println(file.getParent());
        //获取绝对路劲
        System.out.println(file.getAbsoluteFile());
        //获取上一级路劲
        System.out.println(file.getAbsoluteFile().getParent());
        //在当前路径下创建一个临时文件
        File tempFile = File.createTempFile("aaa",".txt",file);
        //当JVM退出后删除临时文件
        tempFile.deleteOnExit();
        File newfile = new File(System.currentTimeMillis()+"");
        System.out.println("新文件是否存在 ：" +newfile.exists());
        newfile.createNewFile();
        newfile.mkdir();
        String[] filelist = file.list();
        System.out.println("====当前路劲下的所有文件");
        for (String str : filelist
             ) {
            System.out.println(str);
        }
        File[] root = File.listRoots();
        for (File files: root
             ) {
            System.out.println(files);

        }



    }
}

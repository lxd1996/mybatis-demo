package JavaIoPacket.IoDemoByMyself;

import java.io.*;

/**
 * @ClassName TxtFileWriter
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/22 15:26
 * @Version 1.0
 **/
public class TxtFileWriter {
    public static void main(String[] args) throws Exception {
        writeFile1();

       // boolean b = deleteFile("d:/tempp/abcd.txt");
        //1.7以上才能使用，用一下新得try-rease语句
        writeFile2();
    }
    public static void writeFile1() throws Exception{
        //先创建文件
        File file = new File("d:/tempp");
        if(!file.exists()){
            file.mkdirs();
        }
        File file1 = new File("d:/tempp/abcd.txt");
        if(!file1.exists()){
            file1.createNewFile();
        }

        //节点类，负责写字节
        FileOutputStream fos = null;
        //转化类，负责字符到字节的转化
        OutputStreamWriter osw = null;
        //装饰类 写字符到缓存区
        BufferedWriter bf= null;
        try{
            //写文件不外乎这几个步骤
            //1.创建一个节点（写东西总要有个地方放是吧）
            //2.人能看的东西是字符，不是0101010，但是机器看到的东西是字节， 所以要将字符转化为字节传输给文件
            //3.文件传输这么慢，cpu等不及，你是不是要放到内存缓存那块才行
            fos = new FileOutputStream("d:/tempp/abcd.txt");
            osw = new OutputStreamWriter(fos);
            bf = new BufferedWriter(osw);
            bf.write("开始写东西进去啦：11111");
            bf.newLine();//"换个行吧"
            bf.write("这是第二行东西");
            //==========数据量小或者写不进去的时候记得要刷新一下啊===================== 因为放到缓冲区了！ 但是读的时候不需要，值都赋值给String了
                                          bf.flush();
            //==========数据量小或者写不进去的时候记得要刷新一下啊=====================
            bf.close();
        }catch (IOException e){
            e.getMessage();
        }

    }
    public static boolean deleteFile(String str){
        File file = new File(str);
        boolean delete = file.delete();
        return delete;
    }
    public static void writeFile2(){
        try(BufferedWriter bf = new BufferedWriter(new OutputStreamWriter( new FileOutputStream("d:\\tempp\\abcd.txt")))){
            bf.write("我是好学生，天天上学校");
            bf.newLine();
            bf.write("小鸟说早早早，你要背上小书包");
            bf.flush();
        }catch (Exception e){
            e.getMessage();
        }

    }
}

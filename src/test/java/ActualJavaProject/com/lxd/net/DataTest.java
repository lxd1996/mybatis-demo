package ActualJavaProject.com.lxd.net;

import java.io.*;

//统计一个目录下所有文本文件里面每个单词出现的次数
//  --大数据分析的入门案例
public class DataTest {
    public static FileInputStream in = null;
    public static InputStreamReader isr = null;
    public static BufferedReader br = null;

    //TO DOING
    public static void main(String[] args) {
        File file = new File("E:\\Io_Test\\DataTest");//创建文件对象

        File[] files = file.listFiles();
        try {
            for (File fi : files
            ) {
                if (fi.isDirectory()) {//判断是否为文件夹，是文件夹的话进入里面再次读取
                    System.out.println("第一层的文件夹：" + fi);
                    File[] files1 = fi.listFiles();
                    for (File fil : files1
                    ) {
                        if (fil.isDirectory()) {
                            System.out.println("第二层的文件夹：" + fil);
                            File[] files2 = fil.listFiles();
                            for (File file2 : files2
                            ) {
                                if (file2.isDirectory()) {
                                    System.out.println("第三层的文件夹：" + fil);
                                    File[] files3 = file2.listFiles();
                                    for (File fil3 : files3
                                    ) {
                                        if(fil3.isDirectory()){
                                            File[] files4 = fil3.listFiles();
                                            for (File fil4: files4
                                                 ) {
                                                readFile(fil4);
                                            }
                                        }else {
                                            readFile(fil3);
                                        }
                                    }
                                }else {
                                    readFile(file2);
                                }
                            }

                        }else {
                            readFile(fil);
                        }
                    }

                }else {
                    readFile(fi);//是文件的话直接读取
                }
                System.out.println(fi);
            }

            br.close();
        } catch (
                Exception e) {
            e.printStackTrace();
        }
    }


    //读取文件内容
    public static void readFile(File fi) throws IOException {
        System.out.println("====================================当前读取的文件是："+fi);
        in = new FileInputStream(fi);//文件节点
        isr = new InputStreamReader(in);//转化为字符
        br = new BufferedReader(isr);//缓冲区
        int temp = 0;
        while ((temp = br.read()) != -1) {
            String s = br.readLine();
            System.out.println(s);
        }

    }

}


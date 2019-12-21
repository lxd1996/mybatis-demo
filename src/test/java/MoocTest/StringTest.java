package MoocTest;

import org.junit.Test;

public class StringTest {

    @Test
    public void stringtest(){
        String str = "123;456;789;123";
        str.charAt(0);//返回第-个元素
        str.indexOf(";");//返回第一个；的位置
                str.concat(";000");//连接一个新的字符串，str不变 //判断str是否包含000//判断str是否以000结尾//判断是否等于000//判断忽略大小写的情况下是否等于000//返回str的长度//返回str去除前面空格后的字符串 str不变//按照；分割字符串
        String aaa = "连接一个新的字符串，str不变 //判断str是否包含000//判断str是否以000结尾//判断是否等于000//判断忽略大小写的情况下是否等于000//返回str的长度//返回str去除前面空格后的字符串 str不变//按照；分割字符串";
        String[] split = aaa.split("//");
        str.concat("000");//连接一个新的字符串，str不变
        str.contains("000");  //      判断str是否包含000
        str.endsWith("000");//判断str是否以000结尾
        str.equals("000");  //      判断是否等于000
        str.equalsIgnoreCase("000");//判断忽略大小写的情况下是否等于000
        str.length();  //      返回str的长度
        str.trim();//返回str去除前面空格前后的字符串 str不变
        //按照；分割字符串
        for (String st: split
             ) {
            System.out.println(st);
        }
        //截取第2个到第5个的字符，还是不变
        str.substring(2,5);
        //把1替换成a
        str.replace("1","a");
        //正则表达式替换
        str.replaceAll("1","a");
        //例：
        String str1 = "123456?790";
        String replaceAll = str1.replace("?", "aa");
        String all = str1.replaceAll("[?]", "aa");
        System.out.println(replaceAll);
        System.out.println(all);

    }
}

package RegexDemo;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexDemo {
    private static final String REGIX = "\\bdog\\b";// \b表示边界
    private static final String str = "dog dog dog dogin";
    public static void main(String[] args) {

        //编译一个Pattern      正则表达式的编译表示
        Pattern p = Pattern.compile(REGIX);

        //用Pattern丈量一个字符串
        Matcher m = p.matcher(str);


        int count = 0;
        while (m.find())
        {
            count++;
            System.out.println(count);
            System.out.println("start():"+m.start());//起始位置
            System.out.println("end()"+m.end());//结束位置
        }
        //部分匹配
        System.out.println(m.lookingAt());//true,因为是部分匹配
        //完全匹配
        System.out.println(m.matches());//false，因为是完全匹配




    }
}

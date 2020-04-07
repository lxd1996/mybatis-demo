package RegexDemo;

import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class String2List {
    public static void main(String[] args) {
        LinkedList<String> names = new LinkedList<>();
        names.add("xiaoming");
        names.add("dahong");
        names.add("xiaohu");
        names.add("laohei");

        String str = String.join(",",names);//jdk1.8引入，只支持字符串的连接
        System.out.println(str);

        //用apache的 commons Lang 可以操作更多类型的元素,例如List里面是数字的也可以加
        String join = StringUtils.join( names,",");
        System.out.println(join);


        String[] split = str.split(",");

        List<String> strings = Arrays.asList(split);
        System.out.println(strings);



    }
}

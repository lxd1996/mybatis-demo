package RegexDemo;


//import org.apache.commons.io.Charsets;
//import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.LinkedList;
import java.util.Scanner;

public class String2InputStream {
    public static void main(String[] args) {
        LinkedList<String> names = new LinkedList<>();
        names.add("xiaoming");
        names.add("dahong");
        names.add("xiaohu");
        names.add("laohei");

        String str = String.join(",",names);

        //InputStream inputStream = IOUtils.toInputStream(str, Charsets.toCharset("UTF-8"));//通过字符转化为输入流
        InputStream inputStream = null;

        System.setIn(inputStream);
        Scanner sc = new Scanner(System.in);
        sc.useDelimiter(",");
        while (sc.hasNext()){
            System.out.println(sc.next());

        }

    }
}

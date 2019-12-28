package FormatExample;

import org.junit.Test;

import java.text.MessageFormat;

//String 的格式化
public class formatWxample {

    @Test
    public void formatT(){
        String message = "{0},{1},{2}";
        String str[] = new String[]{"a","b","c"};
        String format = MessageFormat.format(message, str);
        System.out.println(format);

        message = "oh {0,number,#,##} is good number";
        Object array[] = new Object[]{new Double(3.1415)};
        format = MessageFormat.format(message,array);
        System.out.println(format);

    }
}

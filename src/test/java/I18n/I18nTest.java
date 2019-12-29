package I18n;

import org.junit.Test;

import java.nio.charset.Charset;
import java.util.Locale;
import java.util.Set;
import java.util.SortedMap;

public class I18nTest {

    @Test
    public void I18nT(){
        Locale aDefault = Locale.getDefault();//国际化
        Charset.defaultCharset();
        SortedMap<String, Charset> stringCharsetSortedMap = Charset.availableCharsets();
        System.out.println(aDefault);
        Locale[] alllo  = Locale.getAvailableLocales();
        for (Locale lo: alllo
             ) {
            System.out.println("所有的编码"+lo);
        }
        Set<String> strings = stringCharsetSortedMap.keySet();

        for (String s : strings
             ) {
            System.out.println("所有的语言地区"+s);
        }


    }
}

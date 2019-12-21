package MoocTest.BigIntegerTest;

import org.junit.Test;

import java.util.Calendar;

public class StringBufferTest {
    @Test
    public  void  StrTest(){
        StringBuffer strbf =new StringBuffer("abc");
        StringBuffer str = strbf;//str的内存指向strbf
        strbf.append("2313546678765432");
        System.out.println(str);//内存没变，//str 还是等于strbf
        //测试时间 string string buffer，stringbuild
        final int n = 20000;
        Calendar cl = Calendar.getInstance();
        String strT = "";
        for (int i = 0; i <n ; i++) {
            strT = strT + i + ",";
        }
        System.out.println(Calendar.getInstance().getTimeInMillis()- cl.getTimeInMillis());

        Calendar c2 = Calendar.getInstance();
        StringBuffer strbfT =new StringBuffer("");
        for (int i = 0; i <n ; i++) {
            strbfT.append(i);
            strbfT.append(",");
        }
        System.out.println(Calendar.getInstance().getTimeInMillis()- c2.getTimeInMillis());

        Calendar c3 = Calendar.getInstance();
        StringBuilder strbulT =new StringBuilder("");
        for (int i = 0; i <n ; i++) {
            strbulT.append(i);
            strbulT.append(",");
        }
        System.out.println(Calendar.getInstance().getTimeInMillis()- c3.getTimeInMillis());
    }
}

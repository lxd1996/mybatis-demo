package Calendar;

import org.junit.Test;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class CalanderClassTest {

    @Test
    public void  CalanderTest(){
//        Calender 创建的对象就是GregorianCalender类的对象
        Calendar gc = Calendar.getInstance();
        System.out.println(gc.getClass().getName());//java.util.GregorianCalendar对象
        GregorianCalendar gcl = new GregorianCalendar();
        System.out.println(gcl.getClass().getName());//java.util.GregorianCalendar对象

        int i = gc.get(1);//2019年，2：11+1月
        Date time = gc.getTime();
    }

}

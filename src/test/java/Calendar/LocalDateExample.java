package Calendar;

import org.junit.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;

public class LocalDateExample {

    @Test
    public void LoaclDateTest(){
        LocalDate loacldate = LocalDate.now();
        System.out.println(loacldate);
        //设置时间
        LocalDate ld =LocalDate.of(2014, Month.JANUARY,4);
        System.out.println(ld);
        //可以改时区
        LocalDate ld1 = LocalDate.now(ZoneId.of("Asia/Shanghai"));
        System.out.println(ld1);

        //从某年后的多少天开始
        LocalDate ld2 = LocalDate.ofYearDay(2014,100);
        System.out.println(ld2);

        //从纪元日1970年1月1号开始的多少天
        LocalDate ld3 = LocalDate.ofEpochDay(365);
        System.out.println(ld3);
    }
}

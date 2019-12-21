package Calendar;

import org.junit.Test;

import java.time.*;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

public class InstaneExample {
    @Test
    public void instaneT(){
        //时间戳的类
        //当前的时间戳
        Instant ins = Instant.now();
        //ins.
        System.out.println(ins);
        //从毫秒数来创建时间戳
        Instant ins1 = Instant.ofEpochMilli(ins.toEpochMilli());
        System.out.println(ins1);

        //最主要的点 和之前的Canader类进行交互
        Date date = Date.from(ins);
        System.out.println(date);


        //一般用法示例
        LocalDate today = LocalDate.now();
        LocalDate lastdayofyear = today.with(TemporalAdjusters.lastDayOfYear());

        Period until = today.until(lastdayofyear);//今天到年底时间
        System.out.println(until);
        int months = until.getMonths();
        System.out.println(months);


    }
}

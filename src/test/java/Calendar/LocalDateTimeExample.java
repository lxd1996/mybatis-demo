package Calendar;

import org.junit.Test;

import java.time.LocalDateTime;

public class LocalDateTimeExample {
    @Test
    public void LocalDateTimeT(){
        LocalDateTime ldt = LocalDateTime.now();
        System.out.println(ldt);
    }
}

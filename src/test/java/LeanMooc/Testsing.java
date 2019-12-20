package LeanMooc;

import org.junit.Test;

public class Testsing {

        @Test
        public void Tesing(){
            singtoon sing = singtoon.newInstince();
            singtoon sing2 = singtoon.newInstince();
            System.out.println(sing == sing2);
            String str = singtoon.str;
            sing.setStr("qqqqqqqqq");
            System.out.println(sing.getStr());
            System.out.println(sing2.getStr());



        }

}

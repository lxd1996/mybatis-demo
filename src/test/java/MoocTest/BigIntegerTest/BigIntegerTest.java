package MoocTest.BigIntegerTest;

import org.junit.Test;

import java.math.BigDecimal;
import java.math.BigInteger;
public class BigIntegerTest {
    @Test
    public void BigInTest() {
        BigInteger bg = new BigInteger("123456");
        BigInteger bg2 = new BigInteger("765443");
        BigDecimal bd = new BigDecimal("333.555");
        BigDecimal bd1 = new BigDecimal("333.555");
        bd.add(bd1);
        System.out.println(bg.add(bg2));//加法
    }
}

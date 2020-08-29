package HuaWeiTest;

import java.beans.FeatureDescriptor;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Scanner;

/**
 * @ClassName LifangGen
 * @Description •计算一个数字的立方根，不使用库函数
 *
 * 详细描述：
 *
 * •接口说明
 *
 * 原型：
 *
 * public static double getCubeRoot(double input)
 *
 * 输入:double 待求解参数
 *
 * 返回值:double  输入参数的立方根，保留一位小数
 * @Author lxd
 * @Date 2020/6/25 16:22
 * @Version 1.0
 **/
public class LifangGen {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        //sc.n
        double d1 = sc.nextDouble();

        //BigDecimal
        DecimalFormat df = new DecimalFormat("0.0");
        System.out.println(Math.pow(d1,1.0/3.0));
        System.out.println(df.format(Math.pow(d1,1.0/3.0)));

    }
}

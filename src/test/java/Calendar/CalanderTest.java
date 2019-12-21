package Calendar;

import org.junit.Test;

import java.util.Calendar;

public class CalanderTest {
    static Calendar calendar = Calendar.getInstance();
    @Test
    public void CalanerT(){
        //test1();
        //test2();
        //test3();
        //test4();
        test5();
    }
    public static void test1(){
        //获取年
        int yeat = calendar.get(Calendar.YEAR);
        //获取月
        int mourh = calendar.get(Calendar.MONTH)+1;//叫个什么天文学家顶的0到11月，所以加一
        //获取日
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        //获取时
        int hour = calendar.get(Calendar.HOUR_OF_DAY);//24小时的表示方法
        calendar.get(Calendar.HOUR);//
        //获取分钟
        int minute = calendar.get(Calendar.MINUTE);
        //获取秒
        int second = calendar.get(Calendar.SECOND);
        //获取周
        int Week = calendar.get(Calendar.DAY_OF_WEEK);//外国是从周末开始算的
        //现在是年月日时分秒星期
        System.out.println("现在是"+yeat+"年"+mourh+"月"+hour+"时"+minute+"分"+second+"秒"+"星期"+Week);
    }
    //一年后的今天
    public static void test2(){
        //把时间挪到一年后
        //同理一个月是(Calander.MOUTH,1)
        calendar.add(Calendar.YEAR,1);
        //获取年
        int yeat = calendar.get(Calendar.YEAR);
        //获取月
        int mourh = calendar.get(Calendar.MONTH)+1;//叫个什么天文学家顶的0到11月，所以加一
        //获取日
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println("一年后是"+yeat+"年"+mourh+"月");

    }
    //获取任意一个月的最后一天
    /*衍生：给你一个时间，如何获取这个时间所在月的最后在几号？这个做一做
    * */
    public static void test3(){
     //假设求6月的最后一天
        int currentMouth = 6;//传入的时候按照外国天文学家的那个来说的花就是说这个就是7月的
        calendar.set(calendar.get(Calendar.YEAR),currentMouth,1);
        calendar.add(Calendar.DATE,-1);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println(day);
    }
    //自己设计一个时间
    public static void test4(){
        calendar.set(2018,5,20);
        //获取年
        int yeat = calendar.get(Calendar.YEAR);
        //获取月
        int mourh = calendar.get(Calendar.MONTH)+1;//叫个什么天文学家顶的0到11月，所以加一
        //获取日
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println("设置的是"+yeat+"年"+mourh+"月");
    }

    public static void test5(){
        //add方法  会影响进位
        calendar.set(2018,7,8);
        calendar.add(Calendar.DAY_OF_MONTH,-20);
        //获取年
        int yeat = calendar.get(Calendar.YEAR);
        //获取月
        int mourh = calendar.get(Calendar.MONTH)+1;//叫个什么天文学家顶的0到11月，所以加一
        //获取日
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println("add的加法"+yeat+","+mourh+","+day);

        calendar.set(2018,5,10);
        calendar.roll(Calendar.DAY_OF_MONTH,-11);
        //获取年
        int yeat1 = calendar.get(Calendar.YEAR);
        //获取月
        int mourh1 = calendar.get(Calendar.MONTH)+1;//叫个什么天文学家顶的0到11月，所以加一
        //获取日
        int day1 = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println("roll的加减"+yeat1+","+mourh1+","+day1);
    }
}

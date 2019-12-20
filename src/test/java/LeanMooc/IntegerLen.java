package LeanMooc;

//引出了常量池的概念
/*
* Java为包装类，常量字符串 建立了常量池，即多个变量共享一个常量，把常量作为一个 public final static 的东西来让大家用，节省内存空间
* 基本类型的包装类和字符串有两种创建的方式
* 1.常量式（字面量）的创建方式，放在栈内存 （将被常量化）
* Integer a = 10;
* String str = "str";
* 2.new对象进行创建 放在堆内存
* Integer a = new Integer(20);
* String str = new String("str");
*   重点：栈内存读取速度快，但是容量少
*        堆内存读取速度慢点，但是容量能大一些
*  */



/* 突然想起了c语言的指针了，
Java不是没有指针，是根据类型，可变的使用了隐含的指针
例如，c语言中想用一个方法传入参数改变本来的值的话，那么就需要使用 *i 即指针变量 ，调用方法后 值也会跟着改变，这就是面向过程中的面向对象！！！！！！
    在Java语言中想调用方法不改变本来的值那么只适用于基本类型  int shotr char long double flost 这些基本类型，即面向对象中的面向过程，
    默认使用new出来的对象传参的话，传的都是对象！！！！！！！！！！！！！！！！！！！
*
* */
public class IntegerLen {
    public static void main(String[] args) {
        Integer Int1 = 127;
        Integer Int2 = 127;
        System.out.println(Int1 == Int2);//true
        Integer Int3 = 128;
        Integer Int4 = 128;
        System.out.println(Int3==Int4);//false
    }
}

package LeanMooc;

import org.junit.Test;

/* 突然想起了c语言的指针了，
Java不是没有指针，是根据类型，可变的使用了隐含的指针
例如，c语言中想用一个方法传入参数改变本来的值的话，那么就需要使用 *i 即指针变量 ，调用方法后 值也会跟着改变，这就是面向过程中的面向对象！！！！！！
    在Java语言中想调用方法不改变本来的值那么只适用于基本类型  int shotr char long double flost 这些基本类型，即面向对象中的面向过程，
    默认使用new出来的对象传参的话，传的都是对象！！！！！！！！！！！！！！！！！！！
*
* */
//下面是C语言的例子

//#include <stdio.h>
//
//        void changeInt(int i);
//        void changeInt2(int *i);
//        int main(){
//        int a = 10;
//        changeInt(a);
//        printf("传值的时候：a = %d\n",a);
//
//        int *i;
//        i = &a;
//        changeInt2(i);
//        printf("传指针的时候：a = %d\n",a);
//        return 0 ;
//        }
//        void changeInt(int a){
//        a = 999;
//        }
//
//        void changeInt2 (int *i){
//        int a = 999;
//        *i = a;
//        }
//


//下面是Java例子
public class StringLen {
    public static void changeValue(int i){
        i = 20;//在栈中创建新的空间
    }

    public static void changeValue(String str){

        str = "rts";//在栈中创建新的空间
    }

    public static void changeValue(StringBuffer strbf){
        strbf.append("Test");//在原来的空间（即指针）上新增
    }

    @Test
    public void Stest(){
        int i = 10;
        String str = "str";
        StringBuffer strbf = new StringBuffer("strbf");
        changeValue(i);//传值进去
        changeValue(str);//传值进去
        changeValue(strbf);//传指针进去

        System.out.println(i);//不变
        System.out.println(str);//不变
        System.out.println(strbf);//改变

    }
}

package test;

import java.util.Scanner;

/**
 * @ClassName niuke2
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/17 0:27
 * @Version 1.0
 **/
public class niuke2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String next = sc.next();
        String[] s = next.split(" ");

        if(s[1].equals("1")){//反转小写


        }else if(s[1].equals("2")){//反转大写


        }else if (s[1].equals("3")){//反转数字


        }
    }
    /*
    未加密的str 通过字符串每一个字母进行改变实现加密  加密方式实在每一个字母 str[i] 便宜特定数组元素a[i] 的量 数组a前三位
    位已经复制 ： a[0] = 1;a[1] = 2;a[2] = 4; 当i>=3时 ， 数组元素a[i] = a[i-1] +a[i-2] +a[i-3],
    例如原文 abcde 加密后bdgkr 是其中偏移量分别是1，2，4，7，13
    * */
}

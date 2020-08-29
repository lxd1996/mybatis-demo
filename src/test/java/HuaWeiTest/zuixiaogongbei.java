package HuaWeiTest;

import java.util.Scanner;

/**
 * @ClassName zuixiaogongbei
 * @Description 正整数A和正整数B 的最小公倍数是指 能被A和B整除的最小的正整数值，设计一个算法，求输入A和B的最小公倍数
 * @Author lxd
 * @Date 2020/6/25 16:21
 * @Version 1.0
 **/
public class zuixiaogongbei {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        int ll = zuixiao(a,b);
        System.out.println(ll);
        System.out.println(a*b/zuixiao(a,b));

    }
    public static int zuixiao(int a,int b){
        if(a < b){
            int t = a;
            a = b;
            b = t;
        }
        while(b != 0){
            if(a == b){
                return a;
            }else{
                int k = a % b;
                a = b;
                b = k;
            }
        }
        return a;
    }
}



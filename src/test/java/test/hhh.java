package test;

import java.util.Scanner;

/**
 * @ClassName hhh
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/25 16:08
 * @Version 1.0
 **/
public class hhh {
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

package test;

import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.Scanner;

public class main {
    public static void main(String[] args) {
        //import java.util.Scanner;
        //class A {
         //   public static void main (String[] args) {
        int zuixiao = zuixiao(3, 5);//最大公约数
        System.out.println((3*5)/zuixiao);//最小公倍数
//        Scanner sc = new Scanner(System.in);
//        //Scanner sc = new Scanner(System.in);
//            //System.out.println("请输入字符串");
//            String inputString = sc.nextLine();
//            StringBuilder sb = new StringBuilder(inputString);
//            StringBuilder sb1 = sb.reverse();
//            System.out.println(sb1);
//        System.out.println(3%2);
           // }
        //}
       // Scanner sc = new Scanner(System.in);
        //boolean b =
//        if(sc.hasNext()){
//            String next = sc.next();
//        }
//        System.out.println("please input a int number");
//        int int1 = sc.nextInt();
//        System.out.println(int1);
//        System.out.println("please input a String ");
//        String str = sc.next();
//        System.out.println(str);
//        //sc.
//        int[] arr = new int[5];
//        for (int i = 0; i <arr.length ; i++) {
//            arr[i] = i+((int)(Math.random()*100));
//        }
//        System.out.println(Arrays.toString(arr));
//        //冒泡排序法

    }
    public static int[] maopao(int[] arr){
        for (int i = 0;i < arr.length;i++){

        }
        return arr;
    }
    public static int[] zheban(int[] arr){

        return arr;
    }
    public static int zuixiao(int a, int b){
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

import java.util.Scanner;

public class test1 {
    static int arr[] = new int[5];
    public static void main(String[] args) {
        int a = 5;
        int b =9;
        if(a==9&&(++b<9)){//和c语言一样的，&&前面的执行后 后面的就不执行了
            System.out.println("OK");
        }
        System.out.println(b);
        System.out.println(arr[0]);
        //System.out.println("Zhejiang University".length);
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        int number = Integer.parseInt(str);
        int aa = 100;
        System.out.printf("测试用c语言的格式输出%d",aa);

        System.out.println(Integer.toBinaryString(number));



        //System.out.println(number);



    }
}

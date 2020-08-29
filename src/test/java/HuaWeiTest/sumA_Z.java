package HuaWeiTest;

import java.util.Scanner;

/**
 * @ClassName sumA_Z
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/28 11:54
 * @Version 1.0
 **/
public class sumA_Z {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();

        char[] chars = str.toCharArray();
        int i = 0;
        for (char c : chars
             ) {
            if(c>='A' && c<= 'Z'){
                i++;
            }
        }
        System.out.println(i);
    }
}

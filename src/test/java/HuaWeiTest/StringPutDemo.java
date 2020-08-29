package HuaWeiTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * @ClassName StringPutDemo
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/25 20:05
 * @Version 1.0
 **/
public class StringPutDemo {
    public static void main(String[] args) {
        int i = 0;
        List<String> list = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        while(sc.hasNext()){
            if(i == 0){

                i++;
            }else{
                list.add(sc.nextLine());
            }
        }
        for (String s: list
             ) {
            if(s.length()%8 !=0){
                s = s+"00000000";
            }
            while(s.length()>=8){
                System.out.println(s.substring(0,8));
                s=s.substring(8);
            }
        }


    }


}

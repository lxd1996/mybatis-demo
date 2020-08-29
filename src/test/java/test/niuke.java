package test;

import java.util.Arrays;
import java.util.Scanner;

/**
 * @ClassName niuke
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/16 21:54
 * @Version 1.0
 **/
public class niuke {
    public static void main(String[] args) {
        String result = "";
        Scanner sc = new Scanner(System.in);
        String next = sc.next();
        //String next = "#222233";
        //1.第一次判断是否切换模式
        int i = next.indexOf('#');
        if(i<0){
            //单纯进入数字模式
           result =  numModel(next);
        }else{
            //进入混合模式
            String[] split = next.split("#");
            for (int j = 0; j < split.length ; j++) {
                if(j%2 ==0 ){
                    result = result + numModel(split[j]);
                }else{
                    result = result + wordModel(split[j]);
                }
            }
        }
        //数字模式 #键盘切换
        //System.out.println(next.indexOf('/'));
        //英文模式
        //1(,.)  2(abc) 3(def) 4(ghi) 5(jkl) 6(mno) 7(pqrs) 8(tuv) 9(wxyz)  # 0(空格) /
        StringBuilder sb = new StringBuilder(result.trim());
        StringBuilder reverse = sb.reverse();
        System.out.println(reverse);
    }

    //数字模式输出
    public static String numModel(String str){
        String result  = "";
        String[] split = str.split("/");
        for (String s: split
             ) {
            result += s;
        }
        return result;
    }
    //字符模式输出
    public static String wordModel(String str){
        String result = "";
        int k = 0;
        String[] str1 = null;
        String[] split = str.split("/");
        String [] str2 = new String[50];
        for (int i = 0; i <split.length ; i++) {
            char[] chars = split[i].toCharArray();
            //建立数组
            //String [] str2 = new String[chars.length]; //按照输入的循环 建立数组
            for (int j = 0; j < chars.length; j++) { //把1~9循环分割开来
                if(j+1 <chars.length){
                    if(chars[j] == chars[j+1]){
                        if(str2[j] == null){
                            str2[i] = chars[j] + "" +chars[j+1];
                        }else{
                            str2[i] = str2[i] +chars[j+1];
                        }
                    }else{
                        str2[i+1] = chars[j]+"";
                        //k++;
                        //k++;
                    }
                }
            }
//            System.out.println(Arrays.toString(str2));
//            for (int j = 0; j < str2.length ; j++) {
//                System.out.println(str2[j]);
//            }

            //str1 = str2;

        }
            //循环去找字符
            for (String strchose: str2
            ) {
               result = result + chosechar(strchose);
        }



        return result;
    }

    public static char chosechar(String c){
        if(c == null){
            return 0;
        }
        char c1 = c.charAt(0);
        int i = 0;
        int length = c.length();
        if(c1 == 1){
             i = length % 2;
        }else if (c1 == 7 || c1 ==9){
            i = length % 4;
        }else{
            i = length %3;
        }

        if(c1 == 1){
            if(i == 1){
                return ',';
            }else if(i == 0){
                return '.';
            }
        }else if (c1 == '2'){
            if(i == 1){
                return 'a';
            }else if(i == 2){
                return 'b';
            }else if (i ==0 ){
                return 'c';
            }
        }else if (c1 == '3'){
            if(i == 1){
                return 'd';
            }else if(i == 2){
                return 'e';
            }else if (i ==0 ){
                return 'f';
            }
        }else if (c1 == '4'){
            if(i == 1){
                return 'g';
            }else if(i == 2){
                return 'h';
            }else if (i ==0 ){
                return 'i';
            }
        }else if (c1 == '5'){
            if(i == 1){
                return 'j';
            }else if(i == 2){
                return 'k';
            }else if (i ==0 ){
                return 'l';
            }
        }else if (c1 == '6'){
            if(i == 1){
                return 'm';
            }else if(i == 2){
                return 'n';
            }else if (i ==0 ){
                return 'o';
            }
        }else if (c1 == '7'){
            if(i == 1){
                return 'p';
            }else if(i == 2){
                return 'q';
            }else if (i ==3 ){
                return 'r';
            }else if(i == 0){
                return 's';
            }
        }else if (c1 == '8'){
            if(i == 1){
                return 't';
            }else if(i == 2){
                return 'u';
            }else if (i ==0 ){
                return 'v';
            }
        }else if (c1 == '9'){
            if(i == 1){
                return 'w';
            }else if(i == 2){
                return 'x';
            }else if (i ==3 ){
                return 'y';
            }else if(i == 0){
                return 'z';
            }
        }else if (c1 == '0'){
            char c0 = ' ';
//            for (int j = 0; j <c.length() ; j++) {
//                c0
//            }
            return c0;
        }
        return 0;

    }
}

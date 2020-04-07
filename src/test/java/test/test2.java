package test;

/**
 * @ClassName test2
 * @Description TODO
 * @Author lxd
 * @Date 2020/1/24 22:29
 * @Version 1.0
 **/
public class test2 {
    public static void main(String[] args) {
//        String ster = "liuxuming";
//        String str = ster.toUpperCase();
//        System.out.println(str);
        String str =String.format("%0"+2+"d", 1);
        String str1 =String.format("%00d", 1);

        System.out.println(str1);
    }
    public static int tes(int a,int b){
        return a+b;
    }
}

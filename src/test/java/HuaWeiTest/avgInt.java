package HuaWeiTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * @ClassName avgInt
 * @Description 从输入任意个整型数，统计其中的负数个数并求所有非负数的平均值，结果保留一位小数，如果没有非负数，则平均值为0
 * 本题有多组输入数据，输入到文件末尾，请使用while(cin>>)读入
 * @Author lxd
 * @Date 2020/6/25 19:26
 * @Version 1.0
 **/
public class avgInt {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        List<Integer> list = new ArrayList<Integer>();
        int fushunum=0;
        int zhengshunum = 0;
        double zhengshusum = 0;
        while (sc.hasNext()){
            list.add(sc.nextInt());
        }
        for(Integer i:list){
            if(i<0){
                fushunum++;
            }else if(i>0){
                zhengshusum += i;
                zhengshunum++;
            }
        }
        System.out.println(fushunum);
        if(zhengshunum == 0) {
            System.out.println("0.0");
        }else {
            //double d = zhengshusum +0.0;
            //double d1 = zhengshunum +0.0;
            //System.out.printf("%.1f",(cnt==0?cnt:res/cnt));
            System.out.printf("%.1f",(zhengshusum/zhengshunum));
        }

    }
}

package HuaWeiTest;

/**
 * @ClassName NumResvr
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/28 12:04
 * @Version 1.0
 **/
public class NumResvr {
    public static void main(String[] args) {
        int num = 23450090;
        int rs = 0;
        while(num>0){
            rs = rs * 10;
            rs = rs + num%10;
            num = num / 10;

        }
        System.out.println(rs);
    }
}

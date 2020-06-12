package HRPLicense;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

/**
 * @ClassName License
 * @Description TODO
 * @Author lxd
 * @Date 2020/4/7 14:01
 * @Version 1.0
 **/
public class License {
    public static void main(String[] args) {
        System.out.println(ALLATORIxDEMO("宒乣贜B惃斎木译閅讋橊圹ｪ"));
    }
    public static String ALLATORIxDEMO(String a) {
        int var10000 = (3 ^ 5) << 4 ^ 3 << 2 ^ 1;
        int var10001 = (3 ^ 5) << 4 ^ 2 << 2 ^ 3;
        int var10002 = (3 ^ 5) << 4 ^ (2 ^ 5) << 1;
        int var10003 = a.length();
        char[] var10004 = new char[var10003];
        boolean var10006 = true;
        int var5 = var10003 - 1;
        var10003 = var10002;
        int var3;
        var10002 = var3 = var5;
        char[] var1 = var10004;
        int var4 = var10003;
        var10000 = var10002;

        for(int var2 = var10001; var10000 >= 0; var10000 = var3) {
            var10001 = var3;
            char var6 = a.charAt(var3);
            --var3;
            var1[var10001] = (char)(var6 ^ var2);
            if (var3 < 0) {
                break;
            }

            var10002 = var3--;
            var1[var10002] = (char)(a.charAt(var10002) ^ var4);
        }

        return new String(var1);
    }
//    public static String ALLATORIxDEMO(String a) {
//    int var10000 = 5 << 4 ^ 3 << 1;
//    int var10001 = 4 << 3 ^ 5;
//    int var10002 = (3 ^ 5) << 4 ^ (3 ^ 5) << 1;
//    int var10003 = a.length();
//    char[] var10004 = new char[var10003];
//    boolean var10006 = true;
//    int var5 = var10003 - 1;
//    var10003 = var10002;
//    int var3;
//    var10002 = var3 = var5;
//    char[] var1 = var10004;
//    int var4 = var10003;
//    var10000 = var10002;
//
//    for(int var2 = var10001; var10000 >= 0; var10000 = var3) {
//        var10001 = var3;
//        char var6 = a.charAt(var3);
//        --var3;
//        var1[var10001] = (char)(var6 ^ var2);
//        if (var3 < 0) {
//            break;
//        }
//
//        var10002 = var3--;
//        var1[var10002] = (char)(a.charAt(var10002) ^ var4);
//    }
//
//    return new String(var1);
//}
}

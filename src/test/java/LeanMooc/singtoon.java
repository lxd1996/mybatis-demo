package LeanMooc;

import org.junit.Test;

//单例模式
public class singtoon {
       private final static singtoon danlisingtoon = new singtoon();
       static String str = "abc";
       private String Str1 = "vvvv";
       private singtoon(){
           System.out.println("创建单例模式");
       }

       public static singtoon newInstince() {
           return danlisingtoon;
       }

    public  String getStr() {
        return Str1;
    }

    public  void setStr(String str) {
        this.Str1 = str;
    }
}

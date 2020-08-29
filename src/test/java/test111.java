import java.util.Scanner;

public class test111 {
    //统计大写字个数
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNext()){
            String str = sc.nextLine();
            int i = 0;
            char[] chars = str.toCharArray();
            for (char c: chars
            ) {
                if(c>= 'A' && c<= 'Z'){
                    i++;
                }
            }
            System.out.println(i);
        }
    }
}

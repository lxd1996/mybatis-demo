package ThreadTestMooc;

/**
 * @ClassName ProcessDemo1
 * @Description 多进程方式
 * @Author lxd
 * @Date 2020/6/11 17:50
 * @Version 1.0
 **/
public class ProcessDemo1 {
    public static void main(String[] args) {
        while (true)
        {
            int v = (int)(Math.random() * 100);
            System.out.println("This is random math is " +v);
            try {
                Thread.sleep(5000);
            }catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }
}

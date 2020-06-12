package ThreadTestMooc;

/**
 * @ClassName ThradDemo1
 * @Description 多线程方式进行
 * @Author lxd
 * @Date 2020/6/11 18:00
 * @Version 1.0
 **/
public class ThradDemo1 {
    public static void main(String[] args) throws Exception {
        new TestThread().start();
        while (true){
            System.out.println("Main is runing ===");
            Thread.sleep(1000);
        }
    }
    public static void testThreadDe(){

    }
}

class TestThread extends Thread{
    public void run(){
        while (true){
            System.out.println("TestThread is runing ===");
            try
            {

                Thread.sleep(1000);
            }catch (Exception r)
            {
                r.printStackTrace();
            }
        }
    }
}

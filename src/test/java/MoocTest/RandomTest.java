package MoocTest;

import org.junit.Test;

import java.util.Random;

public class RandomTest {
    @Test
    public void RendomTest(){
        //第一种方法，使用util包下面的Randoms随机数
        Random random = new Random();
        random.nextInt();//
        random.nextInt(100);//100之内的随机数

        //第二种方法，使用math包下面的随机数,返回0到10的随机数
        Math.round(Math.random()*10);  //Math.random返回0.0到1.0之间的随机数

        //jDk8新方法
        random.ints();
        random.ints(10).toArray();//生成10个int范围的数
        int arr[] =random.ints(5,10,100).toArray();//返回5个int类型的10到100的随机数
        for (int i: arr
             ) {
            System.out.println(i);
        }
    }
}

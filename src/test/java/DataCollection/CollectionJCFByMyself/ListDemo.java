package DataCollection.CollectionJCFByMyself;

import java.util.*;

/**
 * @ClassName ListDemo
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/23 18:28
 * @Version 1.0
 **/
public class ListDemo {
    /*
    1.Vector 内部是数组实现的，线程安全，但是增删改查都很慢
    2.ArrayList 内部是数组实现的，线程不安全，代替了Vector，查询速度挺快的，增删改查很慢，多线程的话 需要进行特别处理
    3.LinkedList 内部是双向链表 线程不安全，增删快，查询慢，线程也不安全

    处理线程安全的方法  Collections.synchroinzedList(new ArrayList());

    * **/
    public static void main(String[] args) {
        List arraylist = new ArrayList();
        List linkedList = new LinkedList();

        arraylist.add(null);
        arraylist.add(null);
        arraylist.add("sdfdss");
        arraylist.add(123);

        Iterator it = arraylist.iterator();
        Collections.synchronizedList(new LinkedList<>());
        while (it.hasNext()){
            System.out.println(it.next());
        }

    }
}

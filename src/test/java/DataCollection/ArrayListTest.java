package DataCollection;

import java.util.ArrayList;
import java.util.Iterator;

public class ArrayListTest implements Cloneable {

    public static  void main(String[] args) {
        ArrayList<Integer> al = new ArrayList<>();

        al.add(3434);
        al.add(4567);
        al.remove(1);
        Iterator it = al.iterator();//因为collection实现了Iterable接口，而且Iterable接口中有获取Iterator对象的方法。所有可以这么写
        while(it.hasNext()){
            System.out.println(it.next());
        }



        //Object
    }
}

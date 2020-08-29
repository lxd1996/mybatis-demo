package DataCollection.CollectionJCFByMyself;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

/**
 * @ClassName SetDemo
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/23 17:36
 * @Version 1.0
 **/
public class SetDemo {
    /*Set Collection
     Set 集合，无序的,可以重复的
     HashSet 哈希表实现的  数据无序的  可以放入null,但是只能放入一个nul 线程不安全（实现了HashMap线程安全个鸡巴）
     TreeSet 二叉树实现的  数据有序的  不可以放入null值
         ----个人理解，HashSet的操作就是对HashMap的key的操作
                      TreeSet的操作就是回TreeMap的key的操作
     都是线程不安全的
     实现线程安全的方法：
     对于HashSet来说： 利用  Set set = new Connections.synchroinzedSet(Sets.newHashSet());
     对于treeSet来说： 利用 ConcurrentSkipListSet   Set set = new ConcurrentSkipListSet();
    **/
    /*
    Set集合是一个无序的集合，与其他集合表现出来的最显著的特点是：里面不存在相同的值,当然前提是这些集合有自然顺序（TreeSet），或者用比较性（HashSet）,
    TreeSet是实现排序的理想集合，当遍历TreeSet集合的时候，我们能得到一组有序的元素，当然这个顺序是自然的，也有可能是自定义的。
    一. 存放的元素是基本数据类型
    当TreeSet里面存放的是基本数据类型的时候，由于这些基本数据类型都实现了Comparable接口，那么打印出来的数据就是一个安自然顺序排列的一组数据，
    二. 存放的数据是自定义的类型
    存放的自定义的类，那么这个类就必须实现Comparable接口，重写CompareTo(Object o) 方法 ，使得这个自定义的类具有比较性，要是 想改变 比较性，这时就可以自定义一个比较器，
    即实现了Comparator接口的类，这事就可以通过实例化TreeSet的时候，把比较器传参，就可以实现按照比较器实现排序的 结果。。
    HashSet: 与TreeSet的区别是 底层是hash表，Treeset底层是二叉树。
    一。存放的是基本数据类型：
    直接存。
    二。存放的是自定义的数据类型：
    那么这个类就必须重写 equals(Object o) 和hashCode()方法；原因是 让该类具有比较性，由于底层是hash表多以得重写hashCode()方法，不写当然有默认的
    使用HashSet的时候，因为是线程不安全的，因此得这样做：
    Set s = Collections.synchronizedSet(new HashSet(...));
    此类的 iterator 方法返回的迭代器是快速失败 的：在创建迭代器之后，如果对集合进行修改，除非通过迭代器自身的 remove 方法，否则在任何时间以任何方式对其进行修改，
    Iterator 都将抛出 ConcurrentModificationException。因此，面对并发的修改，迭代器很快就会完全失败，而不冒将来在某个不确定时间发生任意不确定行为的风险。  
    因此要注意多线程的安全问题。*/



    public static void main(String[] args) {
        int[] arr = new int[]{3,5,1,8,9,0,4,0,3};
        String[] str = new String[]{"ew","tyu","nju"};
        //HashSet<Integer> hashset = new HashSet<>(); // 泛型
        Set<String> hashset = new HashSet<>();
        Set treeset = new TreeSet(); //自然排序 自定义排序，如果自定义的话“必须”自己重写compareTo方法（也意味着必须实现Comparable接口）
        Set sss = Collections.synchronizedSet(
                new HashSet<>()
        );


//        for (int i: arr
//             ) {
//            hashset.add(i);
//            treeset.add(i);
//        }
        for (String i: str
        ) {
            hashset.add(i);
            treeset.add(i);
        }

        hashset.add(null);
        //treeset.add(null);//TreeSet二叉树实现不能放null值
        for (Object s: hashset
             ) {
            System.out.println("hashset:"+s);
        }
        for (Object t: treeset
             ) {
            System.out.println(t);
        }



    }
}

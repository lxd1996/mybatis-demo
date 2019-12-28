package DataCollection;

import java.util.HashSet;
import java.util.Iterator;

//java中的四大接口
/**
 * Comparable 比较的接口
 *Clonable可克隆的接口
 *Runnable 可线程化的接口
 * Serializable可序列化的接口
 */

//hashSet ,linkedSet,treSet的元素都必须是对象才行
//hashSet元素相同判定规则，只和hashcode ,equals 这两个方法相同，和CompareTo 无关
//TreeSet    只和CompareTo有关
public class SetTest {

    //TreeSet添加进去的元素必须实现和CompareTo 接口
    public static void main(String[] args) {
        HashSet<Integer> set = new HashSet<Integer>();
        set.add(6);
        set.add(7);
        set.add(8);
        set.add(9);
        set.add(10);
        set.add(6);

        if(!set.contains(8)){
            set.add(8);
        }
        Iterator iterator = set.iterator();

        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }
}

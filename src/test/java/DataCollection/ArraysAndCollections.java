package DataCollection;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

/*
* 工具类Arrays  Collectios
* 实现高效的排序，检索
*1.Arrays:处理对象是数组
*   1）排序：对数组排序，sort/parallelSort
*   2)查找：从数组中查找一个元素，binarySearch.
*   3)批量拷贝 从源数组批量赋值元素到到目标数组 copyOf
*   4）批量赋值 对数组进行批量赋值，file
*   5）等价性比较 判断两个数组是否内容相同 equals
*   6）等等....
*2.Collectios:处理对象是Collectio及其子类
*   1)排序：对Lisr进行排序，sort
*   2)搜索：对List中搜索元素 binarySearch
*   3）批量赋值：对List批量赋值file
*   4）最大，最小值查找 max,min
*   5)反序：将List反序排序 reverse
*   6）等等...
*
*
*
* */
public class ArraysAndCollections {
    public static void main(String[] args) {
        ArrayT();
        CollectiosT();
    }
    public static void CollectiosT(){
        //...
    }
    public static void ArrayT(){
        int[] arr = new int[5];
        Random rd = new Random();
        for (int i = 0; i < arr.length ; i++) {
            arr[i] = rd.nextInt(10);
        }
        Arrays.sort(arr);
        for (int a: arr
             ) {
            System.out.println(a);
        }
        List<int[]> ints = Arrays.asList(arr);
        System.out.println(ints.size());

    }
}

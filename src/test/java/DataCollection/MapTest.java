package DataCollection;

import org.junit.Test;

import java.io.*;
import java.util.*;
/*1.Hashtable 同步，数据量小
2.HashMap 不同步，快，数据量大   K和V允许为null，无序的
    1）LinkedHashMap遍历的顺序和它插入的顺序保持一致,基于双向链表的
3.TreeMap 遍历的顺序是按照自然顺序（大小）或者comperTo方法规定的，只有value支持null值，基于二叉树的
4.Properties 继承于HashTable，同步，数据量小，文件形式的，唯一一个可以将键值对保存到文件中的，所以在用
一般用来写配置文件
    比Hashtable多了四个方法
        1)load,从文件中读取键值对
        2)stor，把键值对写到文件中去
        3）getProperty,获取属性
        4）setProperty,设置属性

总结：
HashMap 是常用的映射结构
需要排序的话 优先使用LinkedMap和TreeMap
需要写入读取配置文件的话 使用Properties
* */
public class MapTest {
    public static void main(String[] args) {
//1.Hashtable 同步，数据量小
        Hashtable<Integer, String> hashtable = new Hashtable<Integer, String>();
        hashtable.put(1, "a");
        hashtable.put(2, "b");
        hashtable.put(3, "c");
        System.out.println(hashtable.contains("a"));
        System.out.println(hashtable.containsValue("a"));//和contains一样的
        System.out.println(hashtable.containsKey(1));

        hashtable.put(3, "cccccccc");//进行了覆盖
        System.out.println(hashtable.size());
        System.out.println(hashtable.get(3));
        hashtable.remove(3);
        System.out.println(hashtable.get(3));
        //迭代器新增了一个Enter的迭代器
        Iterator<Map.Entry<Integer, String>> iterator = hashtable.entrySet().iterator();

        while (iterator.hasNext()) {
            Map.Entry<Integer, String> next = iterator.next();
            next.getKey();
            next.getValue();
        }
        //或者 ierator
        Iterator<Integer> iter = hashtable.keySet().iterator();
        Integer key;
        String value;
        while (iter.hasNext()) {
            key = iter.next();
            value = hashtable.get(key);
            System.out.println(value);
        }
        //KeyEnumeration遍历，一般不用了
    }

//2.HashMap 不同步，快，数据量大   K和V允许为null，无序的
//也可以用collections.synchroinzedMap(new HashMap())来变成同步的
//只有两种迭代器，keyset快一些
    @Test
    public void  HashMapT() {
        HashMap<Integer, String> hashMap = new HashMap<Integer, String>();
        hashMap.put(1, null);
        hashMap.put(2, "bbb");
        hashMap.put(null, "ccc");

        System.out.println(hashMap.get(2));
        hashMap.remove(2);
        System.out.println(hashMap.size());
        System.out.println(hashMap.get(1));//null
        System.out.println(hashMap.get(null));//ccc
    }
    @Test
    public  void  PropertiesT(){
    //3.Properties 同步，数据量小，文件形式的
//        一般用来写配置文件
//                比Hashtable多了四个方法
//        1)load,从文件中读取所有的键值对
//        2)stor，把所有的键值对写到文件中去
//        3）getProperty,获取属性，即获取某一个key对应的Value
//        4）setProperty,设置属性即写入一个键值对
        System.out.println("写入Test.properties");
        WriteProperties("Test.properties","name1","刘旭东1");
        System.out.println("============================");
        System.out.println("读取Test.properties");
        GetAllProperties("Test.properties");
        System.out.println("============================");
        System.out.println("获取特定值");
        GatKeyByValue("Test.properties","name");

    }
    public static void WriteProperties(String filePatn,String kye,String value){
        File file = new File(filePatn);
        try{
        if(!file.exists()){
            file.createNewFile();
        }
            Properties pps = new Properties();
            InputStream in = new FileInputStream(filePatn);//打开文件输入流，加载所有文件
            pps.load(in);//从输入流中读取属性列表
            //调用Hashtable的put方法。使用getProperty 方法提供并行性别
            //强制 要求为属性的键和值使用字符串。返回值是Hashtable调put的结果

            OutputStream out = new FileOutputStream(filePatn);
            pps.setProperty(kye,value);
            //以适合使用load方法加载到properties表中的格式
            //将properties对象中的属性列表写入输入流
            //pps.store(out,kye);//也可以
            pps.store(out,"Update"+kye+"name");
            out.close();
        }catch (IOException e){
            e.getMessage();
        }
    }
    public static void GetAllProperties(String filepath){
        Properties pps = new Properties();
        try {
            InputStream in = new BufferedInputStream(new FileInputStream(filepath));
            pps.load(in);
            Enumeration en = pps.propertyNames();//得到配置文件的名字

            while (en.hasMoreElements()){
                String key = (String)en.nextElement();
                String value = pps.getProperty(key);
                System.out.println("key:"+key+"  value:"+value);
            }


        }catch (IOException e){
            e.getMessage();
        }

    }
    /*
    * 节点类：直接对文件进行读写
    * InputStream,outputStream
    *   File
    * 包装类：
    * 转化类：字节/字符/数据转化类
    *   字节-》字符  字节和数据类型转化
    * 装饰类：装饰节点类
    *
    * */
    public static void GatKeyByValue(String filePath,String key){
        Properties pps = new Properties();

        try {
            InputStream in = new BufferedInputStream(new FileInputStream(filePath));
            pps.load(in);
            String property = pps.getProperty(key);
            System.out.println("value:"+property);
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}

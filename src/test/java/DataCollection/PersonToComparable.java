package DataCollection;

import java.util.Arrays;
import java.util.Comparator;

public class PersonToComparable implements Comparator<Person2> {
    public static void main(String[] args) {

        PersonCT();
        Person2CT();

    }
    public static void Person2CT(){
        Person2[] person = new Person2[3];
        person[0] = new Person2("liu",20);
        person[1] = new Person2("xu",22);
        person[2] = new Person2("dong",22);
        Arrays.sort(person, new PersonToComparable());
        for (Person2 p :person
             ) {
            System.out.println(p.getName()+p.getAge());
        }
    }

    //对于不可改变类内对象的情况下，自己建立一个类，实现Comparator接口，重写compare方法，进行排序
    @Override
    public int compare(Person2 one, Person2 auto) {

        int i = 0;
        i = one.getName().compareTo(auto.getName());
        if (i == 0){
            //一样，返回比较结果
            return one.getAge() - auto.getAge();
        }else{
            return i;
        }
    }
    public  static  void PersonCT(){
        Person[] person = new Person[3];
        person[0] = new Person("liu",20);
        person[1] = new Person("xu",22);
        person[2] = new Person("dong",22);
        Arrays.sort(person);
        for (Person p: person
             ) {
            System.out.println(p.getName()+p.getAge());
        }


    }


}
class Person implements Comparable<Person>{
    String name;
    int age;

    public Person(String name,int age){
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
    @Override
    public int  compareTo(Person auto){
        int i = 0;
        i = name.compareTo(auto.name);
        if (i == 0){
            //一样，返回比较结果
            return age - auto.age;
        }else{
            return i;
        }
    }


}

class Person2{
    private String name;
    private int age;

    public Person2(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}

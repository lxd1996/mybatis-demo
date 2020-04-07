package JsonDemo;

import java.util.List;

/**
 * @ClassName Person
 * @Description Java bean对象
 * @Author lxd
 * @Date 2020/1/15 21:48
 * @Version 1.0
 **/
public class Person {
    private String name;
    private int age;
    private List<Integer> scores;

    public Person(){

    }
    public Person(String name,int age){
        this.age = age;
        this.name = name;
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

    public List<Integer> getScores() {
        return scores;
    }

    public void setScores(List<Integer> scores) {
        this.scores = scores;
    }
}

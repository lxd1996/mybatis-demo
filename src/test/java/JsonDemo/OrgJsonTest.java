package JsonDemo;

import java.util.Arrays;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * @ClassName OrgJsonTest
 * @Description 采用官方推荐的org.json包来解析JSON
 * @Author lxd
 * @Date 2020/1/15 21:48
 * @Version 1.0
 **/
public class OrgJsonTest {

    public static void main(String[] args) {
        testJsonObject();
        testJsonFile();
    }
    public static void testJsonObject(){
        Person person = new Person("小米",25);
        person.setScores(Arrays.asList(70,90,60));
        System.out.println(person.toString());

        //构造Object对象
        JSONObject obj = new JSONObject();
        obj.put("name",person.getName());
        obj.put("age",person.getAge());
        obj.put("scores",person.getScores());
        System.out.println(obj);
        System.out.println(obj.getString("name"));
        System.out.println(obj.getInt("age"));
        System.out.println(obj.getJSONArray("scores"));

    }
    public static void testJsonFile(){

    }
}

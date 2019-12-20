package MoocTest;
import com.github.houbb.opencc4j.util.ZhConverterUtil;

public class ChineseTest {
    public static void main(String[] args) {
        String orgin = "生命在与运动";
        String test = ZhConverterUtil.convertToTraditional(orgin);
        System.out.println(test);
//        String query = """
//               SELECT `EMP_ID`, `LAST_NAME` FROM `EMPLOYEE_TB`
//               WHERE `CITY` = 'INDIANAPOLIS'
//               ORDER BY `EMP_ID`, `LAST_NAME`;
//               """;
//    }
        //var a = "aaa";
        new Thread(()->{
            System.out.println("多线程启动");
        }).start();

    }
}

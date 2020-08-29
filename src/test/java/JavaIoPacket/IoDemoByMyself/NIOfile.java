package JavaIoPacket.IoDemoByMyself;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @ClassName NIOfile
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/22 15:01
 * @Version 1.0
 **/
public class NIOfile {
    public static void main(String[] args) {
        Path path = Paths.get("c:/temp");

        System.out.println(path.getParent());
    }


}

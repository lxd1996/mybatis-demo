package ImageTest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

/**
 * @ClassName imageTest
 * @Description TODO
 * @Author lxd
 * @Date 2020/5/1 6:42
 * @Version 1.0
 **/
public class imageTest {
    public static void main(String[] args) {
        try {
            BufferedImage image = ImageIO.read(new File("C:\\Users\\lxd\\Desktop\\test.jpg"));// image file
            System.out.println(image.getHeight());
        }catch (Exception r){
            r.printStackTrace();
        }
    }
}

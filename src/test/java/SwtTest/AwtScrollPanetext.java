package SwtTest;

import javax.swing.*;
import java.awt.*;

/**
 * @ClassName AwtScrollPanetext
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/30 17:15
 * @Version 1.0
 **/
public class AwtScrollPanetext {
    public static void main(String[] args) {
        setLayoutText();
    }
    public static void setLayoutText(){
        JFrame f = new JFrame();
        f.setLayout(new FlowLayout(FlowLayout.LEFT,20,5));
        for (int i = 0; i <30 ; i++) {
            f.add(new Button("adf"));
        }
        f.pack();
        f.setVisible(true);


    }
    public  static void setScrollPaneTest(){
        JFrame jf = new JFrame();

        ScrollPane sp  = new ScrollPane(ScrollPane.SCROLLBARS_ALWAYS);

        sp.add(new TextField(20));
//        for (int i = 0; i < 10; i++) {
//            sp.add(new Button("abc"));
//        }
        sp.add(new Button("sdf"));

        jf.add(sp);
        jf.setBounds(30,30,250,120);

        jf.setVisible(true);
    }
}

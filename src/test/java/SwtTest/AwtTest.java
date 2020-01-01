package SwtTest;

import javax.swing.*;
import java.awt.*;

public class AwtTest {
    public static void main(String[] args) {
        Frame fm = new Frame("测试窗口");
        Panel pl = new Panel();
        pl.add(new Button("this button"));
        //pl.add(new Box(10));
        pl.add(new TextArea());
        pl.add(new TextField(20));
        fm.add(pl);
        fm.setBounds(40,40,250,300);


        fm.setVisible(true);
    }

}

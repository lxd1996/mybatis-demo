package XmlDemo;

import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

//createElement创建每一个尖括号标签
//appendChild把标签关系挂上去
//挂上去之后通过Transformer,把dom的模型写到文件中去

public class DomWrite {
    public static void main(String[] args) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.newDocument();
            if (document != null) {

            }
            //builder.parse("test.xml");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

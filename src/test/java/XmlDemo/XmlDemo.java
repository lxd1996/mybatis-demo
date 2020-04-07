package XmlDemo;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class XmlDemo {
    //整个树结构读入内存  上百兆的话不行的，内存泄漏，程序崩溃
    public static void main(String[] args) {

        test1();//自上而下进行访问
        test2();//根据名称进行搜索

    }

    public static void test1() {
        //采用Dom解析文档
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse("test.xml");

            NodeList childNodes = document.getChildNodes();
            System.out.println("根节点有几个："+childNodes.getLength());//1,表示根节点

            for (int i = 0; i < childNodes.getLength(); i++) {
                Node people = childNodes.item(i);
                NodeList peoplelist = people.getChildNodes();
                System.out.println("二级的节点有几个（包含空白节点的）："+peoplelist.getLength());//表示二级子节点,5个，实际上是2个，有三个是因为dom之间的空白在程序上也算作一个节点

                for (int j = 0; j < peoplelist.getLength(); j++) {//5
                    Node user = peoplelist.item(j);

                    if (user.getNodeType() == Node.ELEMENT_NODE) {//判断是否为真实的元素，2个真的
                        NodeList nodelist = user.getChildNodes();
                        System.out.println("有几个是最后的节点（包含空白节点）"+nodelist.getLength());//3，3个真的

                        for (int k = 0; k < nodelist.getLength(); k++) {
                            //到达最后一级的文本
                            Node node = nodelist.item(k);

                            if (node.getNodeType() == Node.ELEMENT_NODE) {//判断是否为真实的元素

                                System.out.println(nodelist.item(k).getNodeName() + ":" + nodelist.item(k).getTextContent());

                            }
                        }
                    }

                }
            }


        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void test2() {
        //采用Dom解析文档
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse("test.xml");

            Element element = document.getDocumentElement();
            NodeList nodeList = element.getElementsByTagName("name");//查找name的标签
            if(nodeList != null) {
                for (int i = 0; i < nodeList.getLength(); i++) {
                    Element elem = (Element) nodeList.item(i);
                    System.out.println(elem.getNodeName()+":"+elem.getTextContent());


                }
            }

        }catch (Exception e){
            e.printStackTrace();
        }

    }


}

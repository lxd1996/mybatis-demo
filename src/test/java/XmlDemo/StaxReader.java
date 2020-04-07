package XmlDemo;

import com.sun.deploy.panel.ITreeNode;
import com.sun.xml.internal.ws.util.UtilException;
//import org.apache.commons.io.input.XmlStreamReader;

import javax.xml.stream.*;
import javax.xml.stream.events.*;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Iterator;

/**
 * @ClassName StaxReader
 * @Description 用Stax解析xml，分别是基于指针和基于迭代器的
 * DOM/SAX/Start是jdk自带的解析功能
 * 第三方库：
 *  JDOM:www.jdom.com
 *  DOM4j:dom4j.github.io
 *第三方库一般包含DOM.SAX等多种方式解析。是对Java解析的封装
 * @Author lxd
 * @Date 2020/1/15 20:35
 * @Version 1.0
 **/
public class StaxReader {
    public static void main(String[] args) {
        readByStream();
        System.out.println("分割线================");
        readByEvent();
    }
    /**
     * @descriptions: 基于指针的遍历,流模型
     * @author: lxd
     * @date: 2020/1/15 20:41
     * @version: 1.0
     */
    public static void readByStream(){
        String xmlFile = "test.xml";
        XMLInputFactory factory = XMLInputFactory.newFactory();
        XMLStreamReader streamReader = null;

        //基于指针遍历
        try {

            streamReader = factory.createXMLStreamReader(new FileReader(xmlFile));
            while (streamReader.hasNext()) {
                int event = streamReader.next();
                //如果是元素的开始
                if(event == XMLStreamConstants.START_ELEMENT){
                    //列出所有name
                      if("name".equalsIgnoreCase(streamReader.getLocalName())){
                            System.out.println("name："+streamReader.getElementText());
                        }
                    }
                }
                streamReader.close();
            } catch (XMLStreamException | FileNotFoundException e) {
                e.printStackTrace();
            }

    }
    /**
     * @descriptions: TODO
     * @author: lxd
     * @date: 2020/1/15 21:23
     * @version: 1.0
     */
    public static void readByEvent(){
        String xmlFile = "test.xml";
        XMLInputFactory factory = XMLInputFactory.newFactory();
        boolean titleFlag = false;
        try {
            //创建基于迭代器的事件读取器对象
            XMLEventReader eventReader = factory.createXMLEventReader(new FileReader(xmlFile));
            //遍历Event迭代器
            while (eventReader.hasNext()) {
                XMLEvent event = eventReader.nextEvent();
                //如果事件对象是元素的开始
                if(event.isStartElement()){
                    //转换成开始元素事件对象
                    StartElement start = event.asStartElement();
                    //打印元素标签的本地名称
                    String name = start.getName().getLocalPart();
                    if(name.equals("name")){
                        titleFlag = true;
                        System.out.println("name：");
                    }
                    //取得所有属性
                    Iterator attrs = start.getAttributes();
                    while(attrs.hasNext()){
                        //打印所有属性
                        Attribute attr = (Attribute) attrs.next();
                    }
                }
                //如果是正文的话(被两个标签包在一起)
                if(event.isCharacters()){
                    String s = event.asCharacters().getData();
                    if(null != s && s.trim().length()>0 && titleFlag){
                        System.out.println(s.trim());
                    }
                }
                //如果事件对象是元素的结束
                if(event.isEndElement()){
                    EndElement end = event.asEndElement();
                    String name = end.getName().getLocalPart();
                    if(name.equals("name")){
                        titleFlag = false;
                    }
                }
            }
            eventReader.close();
        } catch (XMLStreamException | FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
